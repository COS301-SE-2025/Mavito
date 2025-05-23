import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegistrationPage.css';
import LsImage from '/LS_image.png';
import DfsiLogo from '/DFSI_Logo.png';

// SVG for Google Logo
const GoogleLogo = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    height="24px"
    width="24px"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    ></path>
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

interface RegistrationResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  profile_pic_url: string;
  is_active: boolean;
  is_verified: boolean;
  account_locked: boolean;
  created_at: string;
  last_login: string | null;
  detail: string;
}

const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setIsLoading(true);

    const NGROK_BASE_URL = 'https://71e1-197-185-129-74.ngrok-free.app'; // <-- REPLACE WITH YOUR NGROK URL
    const API_ENDPOINT = `${NGROK_BASE_URL}/api/v1/auth/register`;

    // CORRECTED userData object creation:
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    console.log('Registration attempt with:', userData);
    console.log('Calling API endpoint:', API_ENDPOINT);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = (await response.json()) as RegistrationResponse;

      if (response.status === 201) {
        // 201 Created
        console.log('Registration successful:', data);

        alert('Registration successful!');
        await navigate('/login');
      } else {
        console.error(
          'Registration failed with status:',
          response.status,
          'Response data:',
          data,
        );
        setError(`${data.detail} Please try again.`);
      }
    } catch (err) {
      console.error('Network or other error during registration:', err);
      setError('An error occurred. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Attempting Google Sign Up');
    // TODO: Implement Google Sign Up logic
  };

  return (
    <div className="registration-page-full-container">
      <div className="registration-left-half">
        <img
          src={LsImage}
          alt="Mavito Welcome"
          className="registration-hero-image"
        />
      </div>

      <div className="registration-right-half">
        <div>
          <img
            src={DfsiLogo}
            alt="DSFSI Logo"
            className="dsfsi-logo-registration"
          />
        </div>

        <div className="registration-form-content">
          <h1 className="registration-header">GET STARTED NOW</h1>
          <p className="registration-subheader">Create your Mavito account.</p>

          {error && (
            <p
              className="error-message"
              style={{
                color: 'red',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              {error}
            </p>
          )}

          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="registration-form"
          >
            <div className="form-row">
              <div className="form-group column">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName} // Bind to state
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }} // Update state
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group column">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName} // Bind to state
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }} // Update state
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email} // Bind to state
                onChange={(e) => {
                  setEmail(e.target.value);
                }} // Update state
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={password} // Bind to state
                onChange={(e) => {
                  setPassword(e.target.value);
                }} // Update state
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword} // Bind to state
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }} // Update state
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                }}
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the{' '}
                <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="register-button primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="social-login-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="register-button google"
              disabled={isLoading}
            >
              <GoogleLogo />
              Create Account with Google
            </button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
