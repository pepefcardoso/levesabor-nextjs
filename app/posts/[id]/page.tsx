"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPost } from "../../../services/postService";
import { formatDate, sanitizeImageUrl } from "../../../tools/helper";
import PageLoadingSkeleton from "../../../components/Skeletons/PageLoadingSkeleton";
import toast from "react-hot-toast";
import { Post } from "../../../typings/post";
import CustomChip from "../../../components/Others/CustomChip";
import AuthorInfo from "../../../components/Others/AuthorInfo";
import CustomImage from "../../../components/Others/CustomImage";
import { bgColors } from "../../../constants/colors";

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
      {post.category?.name && (
        <div className="mb-4">
          <CustomChip bgColor={bgColors.erin} fontColor="white" text={post.category?.name} />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4 leading-snug">{post.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{post.summary}</p>

      <CustomImage
        src={sanitizeImageUrl(post.image?.url)}
        alt={post.title}
        height="450px"
        rounded="md"
        objectFit="cover"
        priority
        shadow="md"
      />

      <div className="text-gray-800 text-base leading-relaxed space-y-4 my-6">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {post.topics && post.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.topics.map((topic) => (
            <CustomChip key={topic.id} bgColor={bgColors.pineapple} fontColor="black" text={'#' + topic.name.toLowerCase()} />
          ))}
        </div>
      )}

      <AuthorInfo
        authorName={post.user?.name || "Autor"}
        authorImage={sanitizeImageUrl(post.user?.image?.url)}
        postDate={post.created_at
          ? `Postado em ${formatDate(post.created_at)}`
          : "Data indisponível"}>
      </AuthorInfo>

    </div>
  );
};

export default PostDetails;
