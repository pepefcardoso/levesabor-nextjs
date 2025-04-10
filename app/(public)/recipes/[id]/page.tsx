"use client";

import React, { useState, useEffect } from "react";
import AuthorInfo from "@/components/Others/AuthorInfo";
import CustomChip from "@/components/Others/CustomChip";
import EmptyList from "@/components/Others/EmptyList";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { bgColors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Recipe } from "@/typings/recipe";
import { clsx } from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { formatDate, sanitizeImageUrl } from "../../../../tools/helper";
import { recipeService } from "@/services/index";
import RatingDisplay from "@/components/Common/RatingDisplay";
import RatingForm from "@/components/Common/RatingForm";
import FavoriteButton from "@/components/Common/FavoriteButton";
import CommentsList from "@/components/Common/Comments/CommentsList";
import useAuthStore from "@/store/authStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isFavorite, setIsFavorite] = useState(recipe?.is_favorited ?? false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        setIsLoaded(false);
        try {
          const data = await recipeService.getById(id as string);
          setRecipe(data);
          setIsFavorite(data.is_favorited ?? false);
          setIsLoaded(true);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Falha ao carregar receita";
          toast.error(message);
          setRecipe(null);
          setIsLoaded(true);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  const handleFavoriteClick = async (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): Promise<void> => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!isAuthenticated || !recipe) return;

    setIsToggling(true);
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const success = await recipeService.toggleFavoriteRecipe(recipe.id);
    if (success) {
      toast.success(
        newFavoriteStatus
          ? "Receita adicionada aos favoritos"
          : "Receita removida dos favoritos"
      );
    } else {
      toast.error("Erro ao atualizar favorito");
      setIsFavorite(!newFavoriteStatus);
    }
    setIsToggling(false);
  };

  if (!isLoaded) return <PageSkeleton />;
  if (!recipe)
    return (
      <div className="min-h-screen mx-auto flex items-center justify-center">
        <EmptyList title="Receita não encontrada" description="Tente outra busca" Icon={FaExclamationTriangle} />
      </div>
    );

  return (
    <div className="mx-auto px-6 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <CustomChip bgColor={bgColors.secondary} text={recipe.category?.name || ""} />
        <FavoriteButton
          isFavorite={isFavorite}
          isToggling={isToggling}
          onClick={handleFavoriteClick}
        />
      </div>

      <h1 className={clsx(Typography.Headline, "mb-6 text-left")}>{recipe.title}</h1>

      <div className="mb-8">
        <AuthorInfo
          authorName={recipe.user?.name || "Autor"}
          authorImage={recipe.user?.image ? sanitizeImageUrl(recipe.user.image.url) : null}
          postDate={recipe.created_at ? `Postado em ${formatDate(recipe.created_at)}` : "Data indisponível"}
        />
      </div>

      <div className="relative w-full h-[340px] mb-6 rounded-lg overflow-hidden">
        <Image
          src={sanitizeImageUrl(recipe.image?.url) || "/placeholder.jpg"}
          alt={recipe.title || "Imagem da receita"}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="mb-8">
        <h2 className={clsx(Typography.Title, "mb-4")}>Avaliação</h2>
        <div className="flex items-center space-x-4">
          <RatingDisplay rating={recipe.ratings_avg_rating ?? 0} />
          {isAuthenticated ? (
            <RatingForm
              initialRating={recipe.ratings_avg_rating ?? 0}
              rateableId={recipe.id}
              rateableType="App\\Models\\Recipe"
              onRatingUpdated={() => {
                toast.success("Avaliação atualizada");
              }}
            />
          ) : (
            <span className="text-gray-500">Faça login para avaliar</span>
          )}
        </div>
      </div>

      <p className={clsx(Typography.Body, "text-left mb-8")}>{recipe.description}</p>

      <h2 className={clsx(Typography.Title, "mb-4")}>Ingredientes</h2>
      <ul className={clsx("list-disc list-inside mb-8 space-y-2")}>        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className={clsx(Typography.Body)}>
            {ingredient.quantity} {ingredient.unit?.name} de {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className={clsx(Typography.Title, "mb-4")}>Modo de Preparo</h2>
      <div className="space-y-6 mb-8">
        {recipe.steps?.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div
              className={clsx(
                Typography.Title,
                bgColors.tertiary,
                "flex items-center justify-center w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-lg shadow-md"
              )}
            >
              {index + 1}
            </div>
            <p className={clsx(Typography.Body)}>{step.description}</p>
          </div>
        ))}
      </div>

      <h2 className={clsx(Typography.Title, "mb-4")}>Dietas</h2>
      <div className="flex flex-wrap gap-3 mb-8 text-left">
        {recipe.diets?.map((diet) => (
          <CustomChip key={diet.id} text={diet.name} />
        ))}
      </div>

      <CommentsList
        commentableId={recipe.id}
        commentableType="App\\Models\\Recipe"
      />
    </div>
  );
};

export default RecipeDetails;
