"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { getRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import CardSkeleton from "../components/CardSkeleton";
import { PaginationResponse, Post, Recipe } from "../typings/api";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/postService";
import NewsletterForm from "../components/NewsletterForm";
import toast from "react-hot-toast";

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
    let isMounted = true;

    const initFetch = () => {
      if (isMounted) {
        fetchRecipes();
        fetchPosts();
      }
    };

    initFetch();

    return () => {
      isMounted = false;
    };
  }, [fetchRecipes, fetchPosts]);

  return (
    <section className="max-container padding-container flex flex-col gap-10 py-12 pb-12 lg:py-16">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">
          Cozinha inclusiva para todas as dietas.
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Explore as nossas receitas deliciosas e artigos informativos!
        </p>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">Receitas</h2>
          <Link href="/recipes" className="text-blue-500 hover:underline">
            Ver Todas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!recipesLoaded
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left">Posts</h2>
          <Link href="/posts" className="text-blue-500 hover:underline">
            Ver Todos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!postsLoaded
            ? [1, 2, 3, 4].map((skeletonId) => (
                <CardSkeleton key={skeletonId} />
              ))
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      <NewsletterForm />
    </section>
  );
}
