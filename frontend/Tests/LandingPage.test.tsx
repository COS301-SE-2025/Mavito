import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import LandingPage from '../src/pages/LandingPage';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue: string }) => {
      if (key === 'appTitle') return options?.defaultValue || 'Mavito Project';
      return key; // Return the key itself for other translations
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
}));

// Mock LanguageSwitcher component
jest.mock('../src/components/LanguageSwitcher', () => {
  const MockLanguageSwitcher = () => (
    <div data-testid="language-switcher">Language Switcher</div>
  );
  MockLanguageSwitcher.displayName = 'MockLanguageSwitcher';
  return MockLanguageSwitcher;
});

// Mock AnimatedGreeting component
jest.mock('../src/components/auth/AnimatedGreeting', () => {
  const MockAnimatedGreeting = () => (
    <div data-testid="animated-greeting">Animated Greeting</div>
  );
  MockAnimatedGreeting.displayName = 'MockAnimatedGreeting';
  return MockAnimatedGreeting;
});

describe('LandingPage', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    render(
      <Router>
        {' '}
        {/* Wrap LandingPage with Router */}
        <LandingPage />
      </Router>,
    );
  });

  test('renders the AnimatedGreeting component', () => {
    // Check if the AnimatedGreeting (mocked) is present
    expect(screen.getByTestId('animated-greeting')).toBeInTheDocument();
  });

  test('renders the LanguageSwitcher component', () => {
    // Check if the LanguageSwitcher (mocked) is present
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  test('renders the registration button', () => {
    // Find the registration button by its text (which comes from the mocked 't' function)
    const registerButton = screen.getByRole('link', {
      name: /landingPage.registerButton/i,
    });
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toHaveAttribute('href', '/register');
  });

  test('renders the login button', () => {
    // Find the login button by its text
    const loginButton = screen.getByRole('link', {
      name: /landingPage.loginButton/i,
    });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');
  });

  test('renders the footer with the current year and app title', () => {
    // Check for the footer text. The year is dynamic.
    // The app title comes from the mocked 't' function with a default value.
    const currentYear = new Date().getFullYear();
    const expectedFooterText = `© ${String(currentYear)} Mavito Project`; // Fixed: String(currentYear)
    // Using a matcher function for more flexibility
    expect(
      screen.getByText((content, element) => {
        // Check if element is not null and is a p tag
        if (element && element.tagName.toLowerCase() === 'p') {
          // Trim whitespace and check if content matches
          return content.trim() === expectedFooterText;
        }
        return false;
      }),
    ).toBeInTheDocument();
  });
});
