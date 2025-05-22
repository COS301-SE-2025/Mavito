import React, { useState, useCallback, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import SearchBar from '../components/ui/SearchBar';
import DropdownFilter from '../components/ui/DropdownFilter';
import ToggleSwitch from '../components/ui/ToggleSwtich';
import { Brain, Wand2 } from 'lucide-react';

interface Suggestion {
  id: string;
  label: string;
}

const SearchPage: React.FC = () => {
  const [term, setTerm] = useState('');
  const [language, setLanguage] = useState('English');
  const [domain, setDomain] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [domainOptions, setDomainOptions] = useState<string[]>([]);
  const [partOfSpeechOptions, setPartOfSpeechOptions] = useState<string[]>([]);
  const [aiSearch, setAiSearch] = useState(false);
  const [fuzzySearch, setFuzzySearch] = useState(false);

  useEffect(() => {
    void fetchDomains().then(setDomainOptions);
    void fetchPOS().then(setPartOfSpeechOptions);
  }, []);

  const handleSearch = useCallback((t: string) => {
    setTerm(t);
  }, []);

  const languages = [
    'Afrikaans',
    'English',
    'isiNdebele',
    'isiXhosa',
    'isiZulu',
    'Sesotho',
    'Setswana',
    'siSwati',
    'Tshivenda',
    'Xitsonga',
    'Sepedi',
  ];

  const fakeSuggestions = async (term: string): Promise<Suggestion[]> => {
    return await Promise.resolve([
      { id: '1', label: `${term} Alpha` },
      { id: '2', label: `${term} Beta` },
      { id: '3', label: `${term} Gamma` },
    ]);
  };

  const fetchDomains = async (): Promise<string[]> => {
    return await Promise.resolve([
      'Construction',
      'Agriculture',
      'Education',
      'Business',
    ]);
  };

  const fetchPOS = async (): Promise<string[]> => {
    return await Promise.resolve(['Noun', 'Adjective', 'Verb']);
  };

  return (
    <div>
      <Navbar />
      <section className="p-6 space-y-4">
        <SearchBar onSearch={handleSearch} fetchSuggestions={fakeSuggestions} />

        <div className="flex flex-wrap gap-4">
          <DropdownFilter
            label="Language"
            options={languages}
            selected={language}
            onSelect={setLanguage}
          />
          <DropdownFilter
            label="Domain"
            options={domainOptions}
            selected={domain}
            onSelect={setDomain}
          />
          <DropdownFilter
            label="Part of Speech"
            options={partOfSpeechOptions}
            selected={partOfSpeech}
            onSelect={setPartOfSpeech}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <ToggleSwitch
            label="AI Search"
            icon={<Brain size={16} />}
            checked={aiSearch}
            onChange={setAiSearch}
          />
          <ToggleSwitch
            label="Fuzzy Search"
            icon={<Wand2 size={16} />}
            checked={fuzzySearch}
            onChange={setFuzzySearch}
          />
        </div>
      </section>

      <div className="p-6 text-theme">
        <strong>Current term:</strong> {term}
      </div>
    </div>
  );
};

export default SearchPage;
