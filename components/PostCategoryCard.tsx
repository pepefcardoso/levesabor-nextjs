import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PostCategory } from "../typings/api";

const PostCategoryCard = ({ category }: { category: PostCategory }) => {
  return (
    <Link href={`/posts/category/${category.id}`}>
      <div className="w-full h-[200px] sm:h-[220px] lg:h-[240px] border border-gray-300 rounded-lg shadow-sm overflow-hidden flex flex-col items-center p-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
        <div className="w-full h-[70%] mb-2 relative">
          <Image
            src={category.image?.url ?? "/placeholder.jpg"}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-center text-gray-800 text-xs sm:text-sm font-semibold">
          {category.name}
        </p>
      </div>
    </Link>
  );
};

export default PostCategoryCard;
