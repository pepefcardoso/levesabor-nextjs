import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostTopic } from "../typings/api";

const PostTopicCard = ({ topic }: { topic: PostTopic }) => {
  return (
    <Link href={`/recipes/topic/${topic.id}`}>
      <div className="flex flex-col items-center text-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg">
          <Image
            src={topic.image?.url ?? "/placeholder.jpg"}
            alt={topic.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">
          {topic.name}
        </p>
      </div>
    </Link>
  );
};

export default PostTopicCard;
