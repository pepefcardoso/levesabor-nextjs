import { Typography } from "@/constants/typography";
import { FiStar } from "react-icons/fi";

interface RatingDisplayProps {
  rating: string | undefined;
}

const RatingDisplay = ({ rating }: RatingDisplayProps) => {
  const parsedRating = rating !== null ? Number(rating) : NaN;
  const isValidRating = !isNaN(parsedRating) && parsedRating > 0;
  const iconColor = isValidRating ? "#FBBF24" : "#9CA3AF";
  const displayRating = isValidRating ? parsedRating.toFixed(1) : "-";

  return (
    <div className="flex items-center space-x-2">
      <FiStar className="w-6 h-6" color={iconColor} />
      <span className={Typography.Tag}>{displayRating}</span>
    </div>
  );
};

export default RatingDisplay;
