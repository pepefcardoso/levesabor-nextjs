import RecipeCard from "../components/RecipeCard";
import Link from "next/link";
import { DUMMY_POSTS, DUMMY_RECIPES } from "../Constants";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <section className="max-container padding-container flex flex-col gap-10 py-12 pb-12 lg:py-16">
      {/* Title and description */}
      <div className="text-center mb-6 px-4">
        <h1 className="text-4xl font-bold">
          Cozinha inclusiva para todas as dietas.
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Explore as nossas receitas deliciosas e artigos informativos!
        </p>
      </div>

      {/* Recipes Section */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-left">
            Receitas
          </h2>
          <Link href="/recipes" className="text-blue-500 hover:underline">
            Ver Todas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DUMMY_RECIPES.slice(0, 4).map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              description={recipe.description}
              id={recipe.id.toString()}
              imageSrc={recipe.imageSrc}
              category={recipe.category}
              diets={recipe.diets}
            />
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-left mt-3">
            Notícias e Artigos
          </h2>
          <Link href="/posts" className="text-blue-500 hover:underline">
            Ver Todas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DUMMY_POSTS.slice(0, 4).map((post, index) => (
            <PostCard
              key={index}
              id={post.id.toString()}
              title={post.title}
              description={post.description}
              imageSrc={post.imageSrc}
              category={post.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
