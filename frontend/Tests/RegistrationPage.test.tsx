// frontend/Tests/RegistrationPage.test.tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, NavigateFunction } from 'react-router-dom';
import RegistrationPage from '../src/pages/RegistrationPage';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
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

const mockNavigate: jest.MockedFunction<NavigateFunction> = jest.fn();

jest.mock('react-router-dom', () => {
  const actual =
    jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: (): NavigateFunction => mockNavigate,
    Link: ({
      to,
      children,
      target,
      rel,
    }: {
      to: string;
      children: React.ReactNode;
      target?: string;
      rel?: string;
    }) => (
      <a href={to} target={target} rel={rel}>
        {children}
      </a>
    ),
  };
});
global.fetch = jest.fn();
global.alert = jest.fn();

describe('RegistrationPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (global.fetch as jest.Mock<Promise<Partial<Response>>>).mockClear();
    (global.alert as jest.Mock).mockClear();
    render(
      <Router>
        <RegistrationPage />
      </Router>,
    );
  });

  const fillForm = (
    options: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      agreeToTerms?: boolean;
    } = {},
  ) => {
    const {
      firstName = 'John',
      lastName = 'Doe',
      email = 'john.doe@example.com',
      password = 'password123',
      confirmPassword = 'password123',
      agreeToTerms = true,
    } = options;

    fireEvent.change(
      screen.getByLabelText(/registrationPage.firstNameLabel/i),
      { target: { value: firstName } },
    );
    fireEvent.change(screen.getByLabelText(/registrationPage.lastNameLabel/i), {
      target: { value: lastName },
    });
    fireEvent.change(screen.getByLabelText(/registrationPage.emailLabel/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/registrationPage.passwordLabel/i), {
      target: { value: password },
    });
    fireEvent.change(
      screen.getByLabelText(/registrationPage.confirmPasswordLabel/i),
      { target: { value: confirmPassword } },
    );

    const termsCheckbox = screen.getByLabelText(
      /registrationPage.agreeToTerms/i,
    );
    if (
      (agreeToTerms && !termsCheckbox.checked) ||
      (!agreeToTerms && termsCheckbox.checked)
    ) {
      fireEvent.click(termsCheckbox);
    }
  };

  const submitForm = async () => {
    await act(async () => {
      const button = await screen.findByRole('button', {
        name: /registrationPage.createAccountButton/i,
      });
      fireEvent.click(button);
    });
  };

  test('renders registration form elements correctly', () => {
    expect(
      screen.getByRole('heading', { name: /registrationPage.title/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/registrationPage.welcomeImageAlt/i),
    ).toHaveAttribute('src', 'test-file-stub');
    expect(
      screen.getByAltText(/registrationPage.dsfsiLogoAlt/i),
    ).toHaveAttribute('src', 'test-file-stub');
  });

  test('shows error if passwords do not match', async () => {
    fillForm({
      password: 'password123',
      confirmPassword: 'passwordMISMATCH',
      agreeToTerms: true,
    });
    await submitForm(); // submitForm is now async
    expect(
      await screen.findByText('Passwords do not match.'),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('submits form, shows alert, and navigates on successful registration', async () => {
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: (): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
      }> =>
        Promise.resolve({
          id: '123',
          email: 'john.doe@example.com',
          first_name: 'John',
          last_name: 'Doe',
        }),
    });
    fillForm();
    await submitForm(); // submitForm is now async

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Registration successful!');
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('displays API error message on failed registration (e.g., email exists)', async () => {
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: (): Promise<{ detail: string }> =>
        Promise.resolve({ detail: 'Email already registered.' }),
    });
    fillForm();
    await submitForm(); // submitForm is now async
    expect(
      await screen.findByText('Email already registered. Please try again.'),
    ).toBeInTheDocument();
  });

  test('displays network error message if fetch throws an error', async () => {
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockRejectedValueOnce(new Error('Network error from test'));
    fillForm();
    await submitForm(); // submitForm is now async
    expect(
      await screen.findByText(
        'An error occurred. Please check your network and try again.',
      ),
    ).toBeInTheDocument();
  });

  test('disables form elements and shows loading text during submission, then navigates', async () => {
    let resolveFetch: (
      value: Partial<Response> | PromiseLike<Partial<Response>>,
    ) => void;
    (
      global.fetch as jest.Mock<Promise<Partial<Response>>>
    ).mockImplementationOnce(
      () =>
        new Promise<Partial<Response>>((res) => {
          resolveFetch = res; // Store the resolve function
        }),
    );

    fillForm({
      firstName: 'LoadingTest',
      lastName: 'User',
      email: 'loading@test.com',
    });

    // Deliberately not awaiting submitForm here to check intermediate loading state
    fireEvent.click(
      screen.getByRole('button', {
        name: /registrationPage.createAccountButton/i,
      }),
    );

    expect(
      await screen.findByRole('button', {
        name: /registrationPage.creatingAccountButton/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/registrationPage.firstNameLabel/i),
    ).toBeDisabled();

    // Now resolve the fetch
    act(() => {
      resolveFetch({
        ok: true,
        json: () => Promise.resolve({ id: 'user123', email: 'test@user.com' }),
        status: 201,
      });
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Registration successful!');
    });
    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      },
      { timeout: 1000 },
    ); // Reduced timeout as direct resolution should be faster
  });

  test('handles Google sign up button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fireEvent.click(
      screen.getByRole('button', {
        name: /registrationPage.createWithGoogle/i,
      }),
    );
    expect(consoleSpy).toHaveBeenCalledWith('Attempting Google Sign Up');
    consoleSpy.mockRestore();
  });
});
