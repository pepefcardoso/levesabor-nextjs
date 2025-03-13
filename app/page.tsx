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
      toast.error("Por favor, recarregue a página");
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
      toast.error("Por favor, recarregue a página");
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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-12">
        {/* Modern Hero Section */}
        <section className="relative min-h-[300px] flex items-center">
          <div className="mx-auto pb-4 sm:pb-8">
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 h-full">
              {/* Text Content */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="space-y-6">
                  <h1 className={clsx(Typography.Display, txtColors.black, "tracking-tight")}>
                    Cozinha Inclusiva: Sabores que Respeitam Todas as Dietas
                  </h1>
                  <p className={clsx(Typography.Title, txtColors.gray500)}>
                    Descubra um universo de possibilidades culinárias adaptadas às necessidades especiais. Desde opções
                    sem glúten até receitas veganas e low-carb, nossa missão é oferecer refeições saborosas que se
                    adequam a qualquer estilo de vida alimentar. Explore artigos informativos e guias práticos para uma
                    nutrição consciente.
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
                    fill
                    className="object-cover rounded-lg shadow-md"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Últimas Receitas</h2>
            <TextButton
              href={routes.recipes.index}
              text="Ver Todas"
              color={txtColors.gray800}
              hoverAnimation={TextButtonHovers.underline}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!recipesLoaded
              ? Array(4)
                  .fill(null)
                  .map((_, index) => <CardSkeleton key={index} />)
              : recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        </section>

        {/* Posts Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Artigos Recentes</h2>
            <TextButton
              href={routes.posts.index}
              text="Ver Todos"
              color={txtColors.gray800}
              hoverAnimation={TextButtonHovers.underline}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!postsLoaded
              ? Array(4)
                  .fill(null)
                  .map((_, index) => <CardSkeleton key={index} />)
              : posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterForm />
      </div>
    </div>
  );
}
