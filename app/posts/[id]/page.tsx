"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPost } from "../../../services/postService";
import { formatDate, sanitizeImageUrl } from "../../../tools/helper";
import PageLoadingSkeleton from "../../../components/Skeletons/PageLoadingSkeleton";
import toast from "react-hot-toast";
import { Post } from "../../../typings/post";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoaded(false);
        try {
          const data = await getPost(id as string);
          setPost(data);
          setIsLoaded(true);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Falha ao carregar post";
          toast.error(message, { position: "bottom-left" });
          console.error(err);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (!isLoaded) {
    return <PageLoadingSkeleton />;
  }

  if (!post) {
    return <div className="text-center py-20">Post não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-6 max-w-4xl py-6">
      <div className="mb-4">
        <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-3 py-1 rounded">
          {post.category?.name}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4 leading-snug">{post.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{post.summary}</p>
      <div className="relative w-full h-[450px] mb-6">
        <Image
          src={sanitizeImageUrl(post.image?.url)}
          alt={post.title}
          fill
          className="rounded-md object-cover"
          priority
        />
      </div>
      <div className="text-gray-800 text-base leading-relaxed space-y-4 mb-6">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {post.topics && post.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.topics.map((topic) => (
            <span
              key={topic.id}
              className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full"
            >
              #{topic.name.toLowerCase()}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4 border-t pt-4">
        <Image
          src={sanitizeImageUrl(post.user?.image?.url)}
          alt={post.user?.name || "Autor"}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-gray-900 font-semibold">{post.user?.name}</p>
          <p className="text-gray-500 text-sm">
            {post.created_at
              ? `Postado em ${formatDate(post.created_at)}`
              : "Data indisponível"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
