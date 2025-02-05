"use client";

import Image from "next/image";
import RecipeCard from "../../../../components/RecipeCard";
import { DUMMY_RECIPE_CATEGORIES, DUMMY_RECIPES } from "../../../../Constants";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  const category = DUMMY_RECIPE_CATEGORIES.at(Number(id));

  if (!category) {
    return <div className="text-center py-20">Categoria não encontrada.</div>;
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl"> {/* Increased max width */}
      {/* Title Section */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Circle Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/food-sample1.jpg"
            alt="Category Thumbnail"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          {category.title}
        </h1>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id.toString()}
            title={recipe.title}
            description={recipe.description}
            imageSrc={recipe.imageSrc}
            diets={recipe.diets}
            category={recipe.category}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition">
          Veja mais
        </button>
      </div>
    </div>
  );
};

export default Page;
