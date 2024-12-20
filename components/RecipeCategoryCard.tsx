import Image from "next/image";
import Link from "next/link";
import React from "react";

type RecipeCategoryCardProps = {
  title: string;
  imageSrc: string;
  id: string;
};

const RecipeCategoryCard = ({
  title,
  imageSrc,
  id,
}: RecipeCategoryCardProps) => {
  return (
    <Link href={`recipes/category/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col min-w-[180px] w-full max-w-[240px] h-[180px] sm:h-[180px]">
        {/* Image section with reduced height */}
        <div className="relative h-[60%] w-full">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        {/* Title section */}
        <div className="flex items-center justify-center p-3 bg-white h-[40%]">
          <p className="text-center text-gray-800 font-semibold text-sm sm:text-base leading-tight">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCategoryCard;
