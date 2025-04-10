import { FiStar } from "react-icons/fi";

interface RatingDisplayProps {
    rating: number;
}

const RatingDisplay = ({ rating }: RatingDisplayProps) => {
    const iconColor = rating > 0 ? "#FBBF24" : "#9CA3AF";
    const displayRating = rating > 0 ? rating.toFixed(1) : "-";

    return (
        <div className="flex items-center space-x-1">
            <FiStar className="w-5 h-5" color={iconColor} />
            <span className="text-sm font-medium">{displayRating}</span>
        </div>
    );
};

export default RatingDisplay;
