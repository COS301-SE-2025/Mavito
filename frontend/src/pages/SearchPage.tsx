import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import SearchBar from '../components/ui/SearchBar';

const SearchPage: React.FC = () => {
  const [term, setTerm] = useState('');

  return (
    <div>
      <Navbar />
      <section className="p-g">
        <SearchBar />
      </section>
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

export default SearchPage;
