import React from 'react';
/*import { useNavigate } from 'react-router-dom';*/
import '../../styles/TermCard.scss';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

interface TermCardProps {
  id: string;
  term: string;
  partOfSpeech: 'Noun' | 'Verb' | 'Adjective' | 'Adverb';
  domain: string;
  upvotes: number;
  downvotes: number;
  definition: string;
  onView?: () => void;
}

const posColorMap: Record<string, string> = {
  Noun: 'blue',
  Verb: 'yellow',
  Adjective: 'pink',
  Adverb: 'green',
};

const TermCard: React.FC<TermCardProps> = ({
  id,
  term,
  partOfSpeech,
  domain,
  upvotes,
  downvotes,
  definition,
  onView,
}) => {
  return (
    <div className="term-card">
      <div className="term-header">
        <div className="term-left">
          <h3 className="term-title">{term}</h3>
          <div className="pills">
            <span className={`pill ${posColorMap[partOfSpeech] || 'gray'}`}>
              {partOfSpeech}
            </span>
            <span className="pill gray">{domain}</span>
          </div>
        </div>
        <div className="term-socials">
          <div className="social">
            <ThumbsUp size={20} className="icon" />
            <span className="count up">{upvotes}</span>
          </div>
          <div className="social">
            <ThumbsDown size={20} className="icon" />
            <span className="count down">{downvotes}</span>
          </div>
          <Share2 size={20} className="icon share" />
        </div>
      </div>

      <p className="term-description">{definition}</p>

      <button
        className="view-button"
        onClick={() => onView?.(id)}
        type="button"
      >
        View
      </button>
    </div>
  );
};

export default TermCard;
