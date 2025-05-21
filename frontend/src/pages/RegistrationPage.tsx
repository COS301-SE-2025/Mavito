
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrationPage.css'; 

// SVG for Google Logo
const GoogleLogo = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24px" width="24px">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const RegistrationPage: React.FC = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    console.log("Form submitted");
    // const formData = new FormData(event.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
  };

  const handleGoogleSignUp = () => {
    console.log("Attempting Google Sign Up");
  };

  return (
    <div className="registration-page-full-container">
      <div className="registration-left-half">
        <img 
          src="/LS_image.png" 
          alt="Mavito Welcome" 
          className="registration-hero-image"
        />
      </div>

      <div className="registration-right-half">
        <div>
          <img 
            src="/DFSI_Logo.png" 
            alt="DSFSI Logo" 
            className="dsfsi-logo-registration" 
          />
        </div>

        <div className="registration-form-content">
          <h1 className="registration-header">GET STARTED NOW</h1>
          <p className="registration-subheader">Create your Marito account.</p>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group column">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
              </div>
              <div className="form-group column">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a password" required />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />
            </div>

            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</Link>
              </label>
            </div>

            <button type="submit" className="register-button primary">
              Create Account
            </button>

            <div className="social-login-divider">
              <span>OR</span>
            </div>

            <button type="button" onClick={handleGoogleSignUp} className="register-button google">
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