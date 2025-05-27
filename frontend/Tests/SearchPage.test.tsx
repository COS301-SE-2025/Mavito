// frontend/Tests/SearchPage.test.tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from '../src/pages/SearchPage';

// Mock Navbar
jest.mock('../src/components/ui/Navbar', () => {
  const MockNavbar = () => <nav data-testid="navbar">Navbar</nav>;
  MockNavbar.displayName = 'MockNavbar';
  return MockNavbar;
});

interface MockSuggestion {
  id: string;
  label: string;
}

// Mock SearchBar
jest.mock('../src/components/ui/SearchBar', () => {
  const MockSearchBar = ({
    onSearch,
    fetchSuggestions,
  }: {
    onSearch: (term: string) => Promise<void> | void;
    fetchSuggestions: (term: string) => Promise<MockSuggestion[]>;
  }) => {
    let currentInputValue = '';
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={(e) => {
            currentInputValue = e.target.value;
            void fetchSuggestions(e.target.value);
          }}
          aria-label="Search term input"
        />
        <button
          type="button"
          data-testid="search-button"
          onClick={() => {
            void onSearch(currentInputValue);
          }}
        >
          Search
        </button>
      </div>
    );
  };
  MockSearchBar.displayName = 'MockSearchBar';
  return MockSearchBar;
});

// Mock DropdownFilter
jest.mock('../src/components/ui/DropdownFilter', () => {
  const MockDropdownFilter = ({
    label,
    selected,
    onSelect,
    options,
  }: {
    label: string;
    selected: string;
    onSelect: (value: string) => void;
    options: string[];
  }) => (
    <div data-testid={`dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <label htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-select`}>
        {label}
      </label>
      <select
        id={`${label.toLowerCase().replace(/\s+/g, '-')}-select`}
        value={selected || ''}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        data-testid={`${label.toLowerCase().replace(/\s+/g, '-')}-select-testid`}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
  MockDropdownFilter.displayName = 'MockDropdownFilter';
  return MockDropdownFilter;
});

// Mock ToggleSwitch
jest.mock('../src/components/ui/ToggleSwtich', () => {
  const MockToggleSwitch = ({
    label,
    checked,
    onChange,
    icon,
  }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    icon: React.ReactNode;
  }) => (
    <div data-testid={`toggle-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      {icon}
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
    </div>
  );
  MockToggleSwitch.displayName = 'MockToggleSwitch';
  return MockToggleSwitch;
});

// Mock TermCard
jest.mock('../src/components/ui/TermCard', () => {
  const MockTermCard = ({
    term,
    definition,
    onView,
  }: {
    term: string;
    definition: string;
    onView: () => void;
  }) => (
    <div
      data-testid={`term-card-${term.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onView();
        }
      }}
    >
      <h4>{term}</h4>
      <p>{definition}</p>
    </div>
  );
  MockTermCard.displayName = 'MockTermCard';
  return MockTermCard;
});

jest.mock('lucide-react', () => ({
  Brain: () => <svg data-testid="brain-icon" />,
  Wand2: () => <svg data-testid="wand-icon" />,
}));

global.fetch = jest.fn();
let mockConsoleLog: jest.SpyInstance;

const mockSearchResultsPage1 = {
  items: [
    {
      id: '1',
      term: 'Apple',
      part_of_speech: 'noun',
      domain: 'Fruit',
      definition: 'A round fruit',
      upvotes: 10,
      downvotes: 1,
    },
    {
      id: '2',
      term: 'Apricot',
      part_of_speech: 'noun',
      domain: 'Fruit',
      definition: 'A small orange fruit',
      upvotes: 5,
      downvotes: 0,
    },
  ],
  total: 20,
};

const mockSearchResultsPage2 = {
  items: [
    {
      id: '11',
      term: 'Banana',
      part_of_speech: 'noun',
      domain: 'Fruit',
      definition: 'A yellow fruit',
      upvotes: 12,
      downvotes: 2,
    },
  ],
  total: 20,
};

const mockEmptyResults = { items: [], total: 0 };
const mockSuggestions = [{ id: 's1', label: 'Apple' }];

type FetchMock = jest.Mock<Promise<Partial<Response>>>;

describe('SearchPage', () => {
  beforeEach(() => {
    (global.fetch as FetchMock).mockClear();
    // Set up a default fetch mock that can be overridden by tests
    (global.fetch as FetchMock).mockImplementation((url: string) => {
      const urlObj = new URL(url);
      if (urlObj.pathname.endsWith('/suggest')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSuggestions),
        } as Partial<Response>);
      }
      if (urlObj.pathname.endsWith('/search')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockEmptyResults),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not Found' }),
      } as Partial<Response>);
    });

    // Spy on console.log before each test
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    act(() => {
      render(
        <Router>
          <SearchPage />
        </Router>,
      );
    });
  });

  afterEach(() => {
    mockConsoleLog.mockRestore(); // Restore the spy after each test
    jest.restoreAllMocks(); // Restore all other mocks
  });

  test('renders initial layout and components correctly', async () => {
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-language')).toBeInTheDocument();

    // Wait for dropdowns to be populated by the useEffect in SearchPage
    // which uses Promise.resolve for initial domain/POS options.
    await waitFor(() => {
      expect(
        screen
          .getByTestId('domain-select-testid')
          .querySelector('option[value="Construction"]'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen
          .getByTestId('part-of-speech-select-testid')
          .querySelector('option[value="Noun"]'),
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId('toggle-ai-search')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-fuzzy-search')).toBeInTheDocument();
  });

  test('fetches and displays search results when a search is performed', async () => {
    (global.fetch as FetchMock).mockImplementation((url: string) => {
      const urlObj = new URL(url);
      if (
        urlObj.pathname.endsWith('/search') &&
        urlObj.searchParams.get('query') === 'Apple'
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSearchResultsPage1),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResults),
      } as Partial<Response>);
    });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Apple' } });
      fireEvent.click(searchButton);
    });

    expect(await screen.findByTestId('term-card-apple')).toBeInTheDocument();
    expect(screen.getByText('A round fruit')).toBeInTheDocument();
    expect(await screen.findByTestId('term-card-apricot')).toBeInTheDocument();
    expect(screen.getByText('A small orange fruit')).toBeInTheDocument();
    expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument();
  });

  test('displays "no results" message when search yields no items', async () => {
    // Default fetch mock in beforeEach returns empty results for /search
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'NonExistentTerm' } });
      fireEvent.click(searchButton);
    });

    expect(
      await screen.findByText('No results found for "NonExistentTerm".'),
    ).toBeInTheDocument();
  });

  test('handles filter changes and re-fetches results', async () => {
    (global.fetch as FetchMock).mockImplementation((url: string) => {
      const urlObj = new URL(url);
      if (urlObj.pathname.endsWith('/search')) {
        if (
          urlObj.searchParams.get('language') === 'Afrikaans' &&
          urlObj.searchParams.get('query') === 'TestFilter'
        ) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockSearchResultsPage1),
          } as Partial<Response>); // total: 20
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockEmptyResults),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Partial<Response>);
    });

    await waitFor(() => {
      // Ensure dropdown is populated
      expect(
        screen
          .getByTestId('language-select-testid')
          .querySelector('option[value="Afrikaans"]'),
      ).toBeInTheDocument();
    });

    const languageSelect = screen.getByTestId('language-select-testid');
    act(() => {
      fireEvent.change(languageSelect, { target: { value: 'Afrikaans' } });
    });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    // Perform a search to trigger the fetch with the new filter
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'TestFilter' } });
      fireEvent.click(searchButton);
    });

    expect(await screen.findByTestId('term-card-apple')).toBeInTheDocument();
    expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument();
  });

  test('handles pagination: next and previous page clicks', async () => {
    const fetchMock = global.fetch as FetchMock;
    const searchTerm = 'PaginatedResults';

    // Setup for initial search (Page 1)
    fetchMock.mockImplementationOnce((url: string) => {
      const urlObj = new URL(url);
      if (
        urlObj.pathname.endsWith('/search') &&
        urlObj.searchParams.get('query') === searchTerm &&
        urlObj.searchParams.get('page') === '1'
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSearchResultsPage1),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResults),
      } as Partial<Response>);
    });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    act(() => {
      fireEvent.change(searchInput, { target: { value: searchTerm } });
      fireEvent.click(searchButton);
    });

    expect(await screen.findByText('Page 1 of 0')).toBeInTheDocument();

    // Setup for Page 2
    fetchMock.mockImplementationOnce((url: string) => {
      const urlObj = new URL(url);
      if (
        urlObj.pathname.endsWith('/search') &&
        urlObj.searchParams.get('query') === searchTerm &&
        urlObj.searchParams.get('page') === '2'
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSearchResultsPage2),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResults),
      } as Partial<Response>);
    });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    act(() => {
      fireEvent.click(nextButton);
    });

    expect(await screen.findByText('Page 2 of 2')).toBeInTheDocument();
    expect(await screen.findByTestId('term-card-banana')).toBeInTheDocument();

    // Setup for returning to Page 1
    fetchMock.mockImplementationOnce((url: string) => {
      const urlObj = new URL(url);
      if (
        urlObj.pathname.endsWith('/search') &&
        urlObj.searchParams.get('query') === searchTerm &&
        urlObj.searchParams.get('page') === '1'
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSearchResultsPage1),
        } as Partial<Response>);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResults),
      } as Partial<Response>);
    });

    const prevButton = screen.getByRole('button', { name: /Previous/i });
    act(() => {
      fireEvent.click(prevButton);
    });

    expect(await screen.findByText('Page 1 of 2')).toBeInTheDocument();
    expect(await screen.findByTestId('term-card-apple')).toBeInTheDocument();
  });

  test('logs navigation when a term card is viewed (onView prop)', async () => {
    (global.fetch as FetchMock).mockImplementation((url: string) => {
      const urlObj = new URL(url);
      if (
        urlObj.pathname.endsWith('/search') &&
        urlObj.searchParams.get('query') === 'AppleFromCard'
      ) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSearchResultsPage1),
        } as Partial<Response>); // Ensure 'Apple' is in items
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEmptyResults),
      } as Partial<Response>);
    });

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'AppleFromCard' } });
      fireEvent.click(searchButton);
    });

    const termCardApple = await screen.findByTestId('term-card-apple'); // id: '1'
    act(() => {
      fireEvent.click(termCardApple);
    });

    expect(mockConsoleLog).toHaveBeenCalledWith('Mock navigate to:', '/term/1');
  });

  test('handles fetch error for search results gracefully', async () => {
    (global.fetch as FetchMock).mockImplementation((url: string) => {
      const urlObj = new URL(url);
      if (urlObj.pathname.endsWith('/search')) {
        // Only make /search fail
        throw new Error('Network Error For Test');
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuggestions),
      } as Partial<Response>); // For suggestions
    });
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'ErrorTest' } });
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Search fetch failed:',
        'Network Error For Test',
      );
    });
    expect(
      screen.getByText('No results found for "ErrorTest".'),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
