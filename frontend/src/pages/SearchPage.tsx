import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import SearchBar from '../components/ui/SearchBar';
import DropdownFilter from '../components/ui/DropdownFilter';
import ToggleSwitch from '../components/ui/ToggleSwtich';
import TermCard from '../components/ui/TermCard';
import { Brain, Wand2 } from 'lucide-react';

/**
 * Represents a single suggestion for the search bar autocomplete.
 */
interface Suggestion {
  id: string;
  label: string;
}

/**
 * Represents a lexicon term returned from the backend.
 */
interface Term {
  id: string;
  term: string;
  partOfSpeech: string;
  domain: string;
  definition: string;
  upvotes: number;
  downvotes: number;
}

/**
 * The main search interface of the application.
 * Includes filters, toggles, and dynamic search result rendering.
 */
const SearchPage: React.FC = () => {
  const [term, setTerm] = useState('');
  const [language, setLanguage] = useState('English');
  const [domain, setDomain] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [domainOptions, setDomainOptions] = useState<string[]>([]);
  const [partOfSpeechOptions, setPartOfSpeechOptions] = useState<string[]>([]);
  const [aiSearch, setAiSearch] = useState(false);
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [results, setResults] = useState<Term[]>([]);

  const navigate = (path: string) => {
    console.log('Mock navigate to:', path);
  };

  useEffect(() => {
    void fetchDomains().then(setDomainOptions);
    void fetchPOS().then(setPartOfSpeechOptions);
  }, []);

  /**
   * Handles submission of a search query.
   * Fetches filtered results from the backend and updates the result list.
   *
   * @param t - The search term entered by the user
   */
  const handleSearch = useCallback(
    async (t: string) => {
      setTerm(t);
      const data = await fetchSearchResults(
        t,
        language,
        domain,
        partOfSpeech,
        aiSearch,
        fuzzySearch,
      );
      setResults(data);
    },
    [language, domain, partOfSpeech, aiSearch, fuzzySearch],
  );

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
    return Promise.resolve([
      { id: '1', label: `${term} Alpha` },
      { id: '2', label: `${term} Beta` },
      { id: '3', label: `${term} Gamma` },
    ]);
  };

  /**
   * Mock fetcher for search results.
   *
   * @param query - The search term
   * @param _language - Selected language
   * @param _domain - Selected domain filter
   * @param _partOfSpeech - Selected part of speech filter
   * @param _ai - Whether AI Search is enabled
   * @param _fuzzy - Whether Fuzzy Search is enabled
   * @returns Promise resolving to a list of terms
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const fetchSearchResults = async (
    query: string,
    _language: string,
    _domain: string,
    _partOfSpeech: string,
    _ai: boolean,
    _fuzzy: boolean,
  ): Promise<Term[]> => {
    return Promise.resolve([
      {
        id: '1',
        term: query,
        definition: `Definition for ${query}`,
        partOfSpeech: 'Noun',
        domain: 'Construction',
        upvotes: 1200,
        downvotes: 300,
      },
      {
        id: '2',
        term: `${query} Plus`,
        definition: 'Another definition example.',
        partOfSpeech: 'Adjective',
        domain: 'Agriculture',
        upvotes: 840,
        downvotes: 120,
      },
    ]);
  };

  /**
   * Fetches domain options from the backend.
   * @returns Promise resolving to an array of domain strings
   */
  const fetchDomains = async (): Promise<string[]> => {
    return Promise.resolve([
      'Construction',
      'Agriculture',
      'Education',
      'Business',
    ]);
  };

  /**
   * Fetches part-of-speech options from the backend.
   * @returns Promise resolving to an array of part-of-speech strings
   */
  const fetchPOS = async (): Promise<string[]> => {
    return Promise.resolve(['Noun', 'Adjective', 'Verb']);
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

      <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((res) => (
          <TermCard
            key={res.id}
            id={res.id}
            term={res.term}
            partOfSpeech={res.partOfSpeech}
            domain={res.domain}
            upvotes={res.upvotes}
            downvotes={res.downvotes}
            definition={res.definition}
            onView={() => {
              navigate(`/term/${res.id}`);
            }}
          />
        ))}

        {results.length === 0 && term && (
          <p className="text-theme opacity-60">
            No results found for "{term}".
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
