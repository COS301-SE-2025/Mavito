import type { FC, ReactNode } from 'react';
import '../../styles/ToggleSwitch.scss';

interface ToggleSwitchProps {
  label: string;
  icon?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  label,
  icon,
  checked,
  onChange,
}) => {
  return (
    <label className="toggle-switch">
      <span className="toggle-label">
        {icon && <span className="icon">{icon}</span>}
        {label}
      </span>
      <div
        className={`switch ${checked ? 'checked' : ''}`}
        onClick={() => {
          onChange(!checked);
        }}
      >
        <div className="thumb" />
      </div>
    </label>
  );
};

export default ToggleSwitch;
