import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../typings/api";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="border border-gray-300 rounded-lg shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 flex flex-col h-[400px] w-full sm:w-auto">
        <div className="p-3">
          <Image
            src={post.image?.url ?? "/placeholder.jpg"}
            alt={post.title}
            width={300}
            height={200}
            className="rounded-md w-full h-48 sm:h-40 object-cover"
          />
        </div>

        <div className="px-3 pb-4 flex flex-col flex-grow">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded w-fit mb-2">
            {post.category?.name}
          </span>

          <h2 className="text-lg sm:text-xl font-bold mb-1">{post.title}</h2>
          <p className="text-gray-600 text-sm line-clamp-3">{post.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
