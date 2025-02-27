import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../../typings/post";
import routes from "../../routes/routes";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={routes.posts.details(post.id)} className="block">
      <div
        className="border border-gray-300 rounded-lg shadow-md cursor-pointer 
                      transition-transform duration-300 ease-in-out 
                      hover:scale-105 hover:shadow-lg flex flex-col h-[420px] w-full sm:w-auto bg-white" // Added bg-white here
      >
        <div className="w-full h-48 sm:h-40 relative">
          <Image
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {post.category?.name && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded w-fit mb-2">
              {post.category.name}
            </span>
          )}

          <h2 className="text-lg sm:text-xl font-bold mb-1 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-3 h-[4.5rem] overflow-hidden">
            {post.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;