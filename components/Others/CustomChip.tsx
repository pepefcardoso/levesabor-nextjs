import React from "react";

interface CustomChipProps {
  color?: string;
  fontColor?: string;
  text: string;
}

const CustomChip: React.FC<CustomChipProps> = ({
  color = "blue",
  fontColor = "white",
  text,
}) => {
  // Helper function to handle color values
  const getColorStyle = (value: string, type: 'bg' | 'text') => {
    if (value.startsWith('#')) {
      return { [type === 'bg' ? 'backgroundColor' : 'color']: value };
    }
    return {};
  };

  return (
    <span
      className="text-xs font-semibold px-3 py-1 rounded-lg shadow-md"
      style={{
        ...getColorStyle(color, 'bg'),
        ...getColorStyle(fontColor, 'text'),
      }}
    >
      {text}
    </span>
  );
};

export default CustomChip;