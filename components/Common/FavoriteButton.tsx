import IconButton from "../Buttons/IconButton";
import { ImSpinner2 } from "react-icons/im";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import { iconColors } from "@/constants/colors";

interface FavoriteButtonProps {
    isFavorite: boolean;
    isToggling: boolean;
    onClick: (
        e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => Promise<void>;
}

const FavoriteButton = ({
    isFavorite,
    isToggling,
    onClick,
}: FavoriteButtonProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const Icon =
        isToggling
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
        <IconButton
            onClick={onClick}
            Icon={Icon}
            color={color}
            size={24}
            className={isToggling ? "animate-spin" : ""}
            disabled={isToggling}
        />
    );
};

export default FavoriteButton;
