import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RecipeDiet } from "../typings/api";

const RecipeDietCard = ({ diet }: { diet: RecipeDiet }) => {
  return (
    <Link href={`/recipes/diet/${diet.id}`}>
      <div className="flex flex-col items-center text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg">
          <Image
            src={diet.image?.url ?? "/placeholder.jpg"}
            alt={diet.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">
          {diet.name}
        </p>
      </div>
    </Link>
  );
};

export default RecipeDietCard;
