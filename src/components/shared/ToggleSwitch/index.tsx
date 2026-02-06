import React from 'react';
import Switch from 'react-switch';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onColor: string;
  offColor: string;
  width: number;
  height: number;
  handleDiameter: number;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, onColor, offColor, width, height, handleDiameter }) => {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      onColor={onColor}
      offColor={offColor}
      checkedIcon={false}
      uncheckedIcon={false}         
      width={width}                
      height={height}                
      handleDiameter={handleDiameter}        
    />
  );
};

export default ToggleSwitch;
