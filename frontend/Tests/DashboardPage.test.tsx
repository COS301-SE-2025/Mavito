// frontend/Tests/DashboardPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from '../src/pages/DashboardPage';
import type { FC } from 'react';
import { type NavigateFunction } from 'react-router-dom';

// Define types for test usage
type RecentTerm = {
  id: string;
  term: string;
  language: string;
  definition: string;
  lastViewed: string;
  translation: string;
};

type CommunityActivity = {
  id: string;
  user: string;
  action: string;
  term: string;
  language: string;
  timestamp: string;
};

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key itself
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}));

// Mock child components
jest.mock('../src/components/LanguageSwitcher', () => {
  const MockLanguageSwitcher: FC = () => (
    <div data-testid="language-switcher">Language Switcher</div>
  );
  MockLanguageSwitcher.displayName = 'MockLanguageSwitcher';
  return {
    __esModule: true,
    default: MockLanguageSwitcher,
  };
});

jest.mock('../src/components/dashboard/LeftPane', () => {
  const MockLeftPane = ({
    onItemClick,
  }: {
    onItemClick: (item: string) => void;
  }) => (
    <div data-testid="left-pane">
      Left Pane
      <button
        type="button"
        onClick={() => {
          onItemClick('search');
        }}
        data-testid="left-pane-search-btn"
      >
        Search Nav
      </button>
    </div>
  );
  MockLeftPane.displayName = 'MockLeftPane';
  return MockLeftPane;
});

// Mock useNavigate
const mockNavigate: jest.MockedFunction<NavigateFunction> = jest.fn();

jest.mock('react-router-dom', () => {
  const actual =
    jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: (): NavigateFunction => mockNavigate, // Explicit return type
  };
});

// Mock global.fetch
global.fetch = jest.fn();

const mockRecentTerms = [
  {
    id: '1',
    term: 'Mock Term 1',
    language: 'Zulu',
    definition: 'Def 1',
    lastViewed: '1 hour ago',
    translation: 'Trans 1',
  },
  {
    id: '2',
    term: 'Mock Term 2',
    language: 'Xhosa',
    definition: 'Def 2',
    lastViewed: '2 hours ago',
    translation: 'Trans 2',
  },
];

const mockCommunityActivities = [
  {
    id: '1',
    user: 'UserA',
    action: 'added',
    term: 'ActivityTerm 1',
    language: 'Zulu',
    timestamp: 'Yesterday',
  },
];

describe('DashboardPage', () => {
  // Clear mocks before each test
  beforeEach(() => {
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockClear();
    mockNavigate.mockClear();
  });

  test('renders dashboard and loads initial data successfully', async () => {
    // Setup successful fetch for this test
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockImplementation(
      (url: string) =>
        Promise.resolve({
          ok: true,
          // Ensure specific return type and remove async if no await
          json: (): Promise<RecentTerm[] | CommunityActivity[]> => {
            if (url === '../../../Mock_Data/recentTerms.json')
              return Promise.resolve(mockRecentTerms);
            if (url === '../../../Mock_Data/communityActivity.json')
              return Promise.resolve(mockCommunityActivities);
            return Promise.resolve([]);
          },
        }),
    );

    render(
      <Router>
        <DashboardPage />
      </Router>,
    );

    // Check for static elements
    expect(
      screen.getByRole('heading', { name: /dashboard.welcome/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/dashboard.userName/i)).toBeInTheDocument();

    // The data loads async. Instead of checking for it not to be there,
    // let's just wait for it to appear.
    // Click the buttons to show the data
    const viewTermsButton = screen.getByRole('button', {
      name: 'dashboard.viewAll',
    });
    const viewActivityButton = screen.getByRole('button', {
      name: 'dashboard.viewAllActivity',
    });

    fireEvent.click(viewTermsButton);
    fireEvent.click(viewActivityButton);

    // Use findBy which waits for the element to appear
    expect(await screen.findByText('Mock Term 1')).toBeInTheDocument();
    expect(await screen.findByText(/ActivityTerm 1/i)).toBeInTheDocument();
  });

  test('toggles recent terms visibility', async () => {
    // Setup successful fetch
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockResolvedValue({
      ok: true,
      // Ensure specific return type, remove async if no await (already done here)
      json: (): Promise<RecentTerm[]> => Promise.resolve(mockRecentTerms),
    });

    render(
      <Router>
        <DashboardPage />
      </Router>,
    );

    // Use a specific name to find the correct button
    const viewAllRecentButton = screen.getByRole('button', {
      name: 'dashboard.viewAll',
    });

    // Ensure the term is not visible initially
    await waitFor(() => {
      expect(screen.queryByText('Mock Term 1')).not.toBeInTheDocument();
    });

    // Click to show
    fireEvent.click(viewAllRecentButton);
    expect(await screen.findByText('Mock Term 1')).toBeInTheDocument();
    expect(viewAllRecentButton).toHaveTextContent(/dashboard.hideTerms/i);

    // Click to hide
    fireEvent.click(viewAllRecentButton);
    await waitFor(() => {
      expect(screen.queryByText('Mock Term 1')).not.toBeInTheDocument();
    });
    expect(viewAllRecentButton).toHaveTextContent(/dashboard.viewAll/i);
  });

  test('handles API fetch errors gracefully with fallback data', async () => {
    // Mock a failed fetch for this specific test
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockRejectedValue(
      new Error('API Down'),
    );

    // Suppress console.error for this test to keep the output clean
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <Router>
        <DashboardPage />
      </Router>,
    );

    // Find the correct button using its specific text
    const viewAllRecentButton = screen.getByRole('button', {
      name: 'dashboard.viewAll',
    });

    // Click to show the terms section
    fireEvent.click(viewAllRecentButton);

    // Now, wait for the fallback term "Agroforestry" to appear.
    // findByText will wait for the UI to update after the fetch fails and fallback state is set.
    expect(await screen.findByText('Agroforestry')).toBeInTheDocument();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
