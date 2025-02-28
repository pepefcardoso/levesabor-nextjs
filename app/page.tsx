"use client";

import { useEffect, useState, useCallback } from "react";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/Cards/RecipeCard";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import PostCard from "../components/Cards/PostCard";
import { getPosts } from "../services/postService";
import toast from "react-hot-toast";
import NewsletterForm from "../components/Forms/NewsletterForm";
import { PaginationResponse } from "../typings/pagination";
import { Post } from "../typings/post";
import { Recipe } from "../typings/recipe";
import routes from "../routes/routes";
import CustomTextButton from "../components/Buttons/CustomTextButton"; // Import CustomTextButton

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
      toast.error("Por favor, recarregue a página", {
        position: "bottom-left",
      });
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
      toast.error("Por favor, recarregue a página", {
        position: "bottom-left",
      });
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
      <div className="w-full max-w-7xl px-4 py-12 lg:py-16 flex flex-col gap-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Cozinha inclusiva para todas as dietas.
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Explore as nossas receitas deliciosas e artigos informativos!
          </p>
        </div>

        <div className="px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Receitas</h2>
            <CustomTextButton
              href={routes.recipes.index}
              text="Ver Todas"
              fontColor="text-blue-500"
              className="hover:underline"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!recipesLoaded
              ? Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
              : recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </div>

        <div className="px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Posts</h2>
            <CustomTextButton
              href={routes.posts.index}
              text="Ver Todos"
              fontColor="text-blue-500"
              className="hover:underline"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!postsLoaded
              ? Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
              : posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>

        <NewsletterForm />
      </div>
    </div>
  );
}