"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import routes from "../routes/routes";
import TextButton from "@/components/Buttons/TextButton";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import RecipeCard from "@/components/Cards/RecipeCard";
import PostCard from "@/components/Cards/PostCard";
import NewsletterForm from "@/components/Forms/NewsletterForm";
import { Recipe } from "@/typings/recipe";
import { Post } from "@/typings/post";
import { PaginationResponse } from "@/typings/pagination";
import { getRecipes } from "@/services/recipeService";
import { getPosts } from "@/services/postService";
import { txtColors } from "@/constants/colors";
import { TextButtonHovers } from "@/typings/buttons";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import Image from "next/image";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const response: PaginationResponse<Recipe> = await getRecipes({
        filters: undefined,
        pagination: { page: 1, per_page: 4 },
      });
      setRecipes(response.data);
      setRecipesLoaded(true);
    } catch {
      toast.error("Por favor, recarregue a página", { id: "error-message" });
      setRecipesLoaded(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response: PaginationResponse<Post> = await getPosts({
        filters: undefined,
        pagination: { page: 1, per_page: 4 },
      });
      setPosts(response.data);
      setPostsLoaded(true);
    } catch {
      toast.error("Por favor, recarregue a página", { id: "error-message" });
      setPostsLoaded(false);
    }
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      await Promise.all([fetchRecipes(), fetchPosts()]);
    };
    initFetch();
  }, [fetchRecipes, fetchPosts]);

  return (
    <div className="w-full justify-center max-w-7xl mx-auto px-6 sm:px-12 py-12 flex flex-col gap-12">
      <section className="relative min-h-[300px] flex items-center">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 h-full">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="space-y-4">
                <h1 className={clsx(Typography.Display, "tracking-tight")}>
                  Cozinha Inclusiva: Sabores que Respeitam Todas as Dietas
                </h1>
                <p className={clsx(Typography.Body, txtColors.gray500)}>
                  Descubra um universo de possibilidades culinárias adaptadas às necessidades especiais. Desde opções
                  sem glúten até receitas veganas e low-carb, nossa missão é oferecer refeições saborosas que se adequam
                  a qualquer estilo de vida alimentar. Explore artigos informativos e guias práticos para uma nutrição
                  consciente.
                </p>
                <div className="mt-6">
                  <TextButton
                    href={routes.recipes.index}
                    text="Comece Sua Jornada Culinária"
                    color={txtColors.primary}
                    hoverAnimation={TextButtonHovers.scale}
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 hidden sm:block relative h-[400px] lg:h-auto">
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src="/placeholder.jpg"
                  alt="Healthy ingredients arrangement"
                  width={600}
                  height={400}
                  className="object-cover rounded-lg shadow-md"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className={clsx(Typography.Headline)}>Últimas Receitas</h2>
          <TextButton
            href={routes.recipes.index}
            text="Ver Todas"
            color={txtColors.gray800}
            hoverAnimation={TextButtonHovers.underline}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {!recipesLoaded
            ? Array(4)
                .fill(null)
                .map((_, index) => <CardSkeleton key={index} />)
            : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className={clsx(Typography.Headline)}>Artigos Recentes</h2>
          <TextButton
            href={routes.posts.index}
            text="Ver Todos"
            color={txtColors.gray800}
            hoverAnimation={TextButtonHovers.underline}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {!postsLoaded
            ? Array(4)
                .fill(null)
                .map((_, index) => <CardSkeleton key={index} />)
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>

      <NewsletterForm />
    </div>
  );
}
