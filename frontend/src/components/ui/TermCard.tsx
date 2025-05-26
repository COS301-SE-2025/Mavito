import React from 'react';
/*import { useNavigate } from 'react-router-dom';*/
import '../../styles/TermCard.scss';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

interface TermCardProps {
  id: string;
  term: string;
  part_of_speech: 'noun' | 'verb' | 'adjective' | 'adverb';
  domain: string;
  upvotes: number;
  downvotes: number;
  definition: string;
  onView?: () => void;
}

const posColorMap: Record<string, string> = {
  noun: 'blue',
  verb: 'yellow',
  adjective: 'pink',
  adverb: 'green',
};

const TermCard: React.FC<TermCardProps> = ({
  id,
  term,
  part_of_speech,
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
          <h3 className="text-left font-bold text-lg truncate w-full term-title">
            {term.length > 40 ? `${term.slice(0, 40)}...` : term}
          </h3>
          <div className="pills">
            <span className={`pill ${posColorMap[part_of_speech] || 'gray'}`}>
              {part_of_speech}
            </span>
            <span className="pill gray">
              {domain.length > 11 ? `${domain.slice(0, 11)}...` : domain}
            </span>
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

      <p className="term-description">
        {definition.length > 30 ? `${definition.slice(0, 30)}...` : definition}
      </p>

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
