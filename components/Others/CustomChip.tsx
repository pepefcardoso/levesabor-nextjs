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
  return (
    <span
      className={`bg-${color}-500 text-${fontColor} text-xs font-semibold px-3 py-1 rounded-lg shadow-md`} // Added shadow-md for a smooth, always-visible shadow
    >
      {text}
    </span>
  );
};

export default CustomChip;