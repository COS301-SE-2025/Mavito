// frontend/Tests/LoginPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, NavigateFunction } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';

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

// Mock LanguageSwitcher component
jest.mock('../src/components/LanguageSwitcher', () => {
  const MockLanguageSwitcher = () => (
    <div data-testid="language-switcher">Language Switcher</div>
  );
  MockLanguageSwitcher.displayName = 'MockLanguageSwitcher';
  return MockLanguageSwitcher;
});

// Mock useNavigate
const mockNavigate: jest.MockedFunction<NavigateFunction> = jest.fn();

jest.mock('react-router-dom', () => {
  const actual =
    jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: (): NavigateFunction => mockNavigate, // Explicit return type
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

global.fetch = jest.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockClear();
    // Default successful login response for most tests
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockResolvedValue({
      ok: true,
      json: (): Promise<{ access_token: string; token_type: string }> =>
        Promise.resolve<{ access_token: string; token_type: string }>({
          access_token: 'fake-token',
          token_type: 'bearer',
        }),
    });
    render(
      <Router>
        <LoginPage />
      </Router>,
    );
  });

  test('renders login form elements correctly', () => {
    expect(
      screen.getByRole('heading', { name: /loginPage.title/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/loginPage.emailLabel/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/loginPage.passwordLabel/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /loginPage.loginButton/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /loginPage.loginWithGoogle/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/loginPage.noAccount/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /loginPage.registerLink/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    // Corrected src attribute to match the global fileMock.js
    expect(screen.getByAltText('Mavito Login Welcome')).toHaveAttribute(
      'src',
      'test-file-stub',
    );
    expect(screen.getByAltText(/loginPage.dsfsiLogoAlt/i)).toHaveAttribute(
      'src',
      'test-file-stub',
    );
  });

  test('allows user to input email and password', () => {
    const emailInput = screen.getByLabelText(/loginPage.emailLabel/i);
    const passwordInput = screen.getByLabelText(/loginPage.passwordLabel/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
    expect((passwordInput as HTMLInputElement).value).toBe('password123');
  });

  test('submits the form and navigates on successful login', async () => {
    // beforeEach already sets up a successful mock

    const emailInput = screen.getByLabelText(/loginPage.emailLabel/i);
    const passwordInput = screen.getByLabelText(/loginPage.passwordLabel/i);
    const loginButton = screen.getByRole('button', {
      name: /loginPage.loginButton/i,
    });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('displays error message on failed login', async () => {
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockResolvedValueOnce({
      // Override for this test
      ok: false,
      json: (): Promise<{ detail: string }> =>
        Promise.resolve({ detail: 'Invalid credentials' }),
    });

    const emailInput = screen.getByLabelText(/loginPage.emailLabel/i);
    const passwordInput = screen.getByLabelText(/loginPage.passwordLabel/i);
    const loginButton = screen.getByRole('button', {
      name: /loginPage.loginButton/i,
    });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('displays network error message if fetch throws an error', async () => {
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockRejectedValueOnce(new Error('Network failure from test')); // Override for this test

    const loginButton = screen.getByRole('button', {
      name: /loginPage.loginButton/i,
    });
    // Fill in form to ensure handleSubmit's initial checks pass
    fireEvent.change(screen.getByLabelText(/loginPage.emailLabel/i), {
      target: { value: 'any@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/loginPage.passwordLabel/i), {
      target: { value: 'anypassword' },
    });
    fireEvent.click(loginButton);

    expect(
      await screen.findByText(
        'Network error. Please check your connection and try again.',
      ),
    ).toBeInTheDocument();
  });

  test('handles Google login button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const googleLoginButton = screen.getByRole('button', {
      name: /loginPage.loginWithGoogle/i,
    });
    fireEvent.click(googleLoginButton);
    expect(consoleSpy).toHaveBeenCalledWith('Attempting Google Login');
    consoleSpy.mockRestore();
  });
});
