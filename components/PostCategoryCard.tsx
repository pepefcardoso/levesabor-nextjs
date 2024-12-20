import React from "react";
import Image from "next/image";
import Link from "next/link";

type PostCategoryCardProps = {
  id: string;
  title: string;
  imageSrc: string;
};

const PostCategoryCard = ({ id, title, imageSrc }: PostCategoryCardProps) => {
  return (
    // Corrigir o link para a página de categorias
    <Link href={id} aria-label={`View posts in ${title} category`}>
      <div className="w-full h-[200px] sm:h-[220px] lg:h-[240px] border border-gray-300 rounded-lg shadow-sm overflow-hidden flex flex-col items-center p-2 transition-transform duration-200 hover:scale-105 cursor-pointer">

        <div className="w-full h-[70%] mb-2 relative">
          <Image
            src={imageSrc}
            alt={`Category image for ${title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Title */}
        <p className="text-center text-gray-800 text-xs sm:text-sm font-semibold">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default PostCategoryCard;
