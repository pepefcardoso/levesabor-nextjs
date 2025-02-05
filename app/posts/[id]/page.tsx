"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { DUMMY_POSTS } from "../../../constants";

const PostDetails = () => {
  const { id } = useParams();

  const post = DUMMY_POSTS.find((post) => post.id === Number(id));

  if (!post) {
    return <div className="text-center py-20">Receita não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-6 max-w-4xl py-6">
      {/* <h1 className="text-2xl font-bold mb-4">Post Details for ID: {id}</h1> */}
      {/* Category Tag */}
      <div className="mb-4">
        <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-3 py-1 rounded">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 leading-snug">{post.title}</h1>

      {/* Description */}
      <p className="text-gray-600 text-lg mb-6">{post.description}</p>

      {/* Image */}
      <div className="mb-6">
        <Image
          src={post.imageSrc}
          alt={post.title}
          width={800}
          height={450}
          className="rounded-md object-cover w-full"
        />
      </div>

      {/* Content */}
      <div className="text-gray-800 text-base leading-relaxed space-y-4 mb-10">
        {post.content.split("\n").map((paragraph:string, index:number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Author Section */}
      <div className="flex items-center space-x-4 border-t pt-4">
        {/* Author Image */}
        <Image
          src={post.authorImageSrc}
          alt={post.author}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        {/* Author Info */}
        <div>
          <p className="text-gray-900 font-semibold">{post.author}</p>
          <p className="text-gray-500 text-sm">Postado em {post.postDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
