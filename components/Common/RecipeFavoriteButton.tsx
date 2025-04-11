import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import useAuthStore from "@/store/authStore";
import { iconColors } from "@/constants/colors";
import clsx from "clsx";
import { FiHeart } from "react-icons/fi";

interface RecipeFavoriteButtonProps {
    isFavorite: boolean;
    isToggling: boolean;
    onClick: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => Promise<void>;
}

const RecipeFavoriteButton = ({ isFavorite, isToggling, onClick }: RecipeFavoriteButtonProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const Icon = isToggling
        ? ImSpinner2
        : isAuthenticated
            ? isFavorite
                ? FaHeart
                : FiHeart
            : FiHeart;

    const color = isAuthenticated
        ? isFavorite
            ? iconColors.red
            : iconColors.gray
        : iconColors.grayLight;

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(e);
            }}
            disabled={isToggling || !isAuthenticated}
            className={clsx(
                "transition-colors duration-200 p-2 rounded-lg",
                isToggling ? "animate-spin" : "",
                isAuthenticated ? "cursor-pointer hover:scale-105" : "cursor-not-allowed",
                "bg-white shadow-md hover:shadow-lg",
            )}
            aria-label="Toggle favorite"
            title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            style={{ color }}
        >
            <Icon className="text-xl" />
        </button>
    );
};

export default RecipeFavoriteButton;
