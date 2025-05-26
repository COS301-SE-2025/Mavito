import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

const SavedTermsPage: React.FC = () => {
  const [term, setTerm] = useState('');

  return (
    <div>
      <Navbar />
      {term}
      <button
        onClick={() => {
          setTerm('Search');
        }}
        aria-label="Button"
        type="button"
      >
        Click me
      </button>
    </div>
  );
};

export default SavedTermsPage;
