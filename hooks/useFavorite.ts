import { useState } from "react";
import toast from "react-hot-toast";

type ToggleFavoriteFn = (newStatus: boolean) => Promise<boolean>;

const useFavorite = (toggleFavoriteFn: ToggleFavoriteFn, initialValue: boolean = false) => {
  const [isFavorite, setIsFavorite] = useState(initialValue);
  const [isToggling, setIsToggling] = useState(false);

  const handleFavoriteClick = async (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    setIsToggling(true);
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const success = await toggleFavoriteFn(newFavoriteStatus);

    if (success) {
      toast.success(newFavoriteStatus ? "Adicionado aos favoritos" : "Removido dos favoritos");
    } else {
      toast.error("Erro ao atualizar favorito");
      setIsFavorite(!newFavoriteStatus);
    }
    setIsToggling(false);
  };

  return { isFavorite, isToggling, handleFavoriteClick };
};

export default useFavorite;
