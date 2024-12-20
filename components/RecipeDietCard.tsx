import Image from "next/image";
import Link from "next/link";
import React from "react";

type RecipeDietCardProps = {
  diet: string;
  imageSrc: string;
  link: string;
};

const RecipeDietCard = ({ diet, imageSrc, link }: RecipeDietCardProps) => {
  return (
    <Link href={link}>
      <div className="flex flex-col items-center text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
        {/* Circle Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg">
          <Image
            src={imageSrc}
            alt={diet}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Diet Title */}
        <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">
          {diet}
        </p>
      </div>
    </Link>
  );
};

export default RecipeDietCard;
