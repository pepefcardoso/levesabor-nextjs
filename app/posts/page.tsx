"use client";

import React from "react";
import PostCard from "../../components/PostCard";
import PostCategoryCard from "../../components/PostCategoryCard";
import NewsletterForm from "../../components/NewsletterForm";
import { DUMMY_POST_CATEGORIES, DUMMY_POSTS } from "../../constants";

export default function PostsHome() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl w-full"> {/* Adjusted max-w-6xl to max-w-5xl */}
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-8">
        Últimas notícias
      </h1>

      {/* Post Cards Grid with responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {DUMMY_POSTS.slice(0, 4).map((post, index) => (
          <PostCard
            key={index}
            id={post.id.toString()}
            title={post.title}
            description={post.description}
            imageSrc={post.imageSrc}
            category={post.category}
          />
        ))}
      </div>

      {/* Title for Categories */}
      <h2 className="text-2xl sm:text-3xl font-bold text-left mb-8">
        Por categorias
      </h2>

      {/* Category Cards Grid with responsive columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
        {DUMMY_POST_CATEGORIES.map((category, index) => (
          <PostCategoryCard
            key={index}
            id={category.id}
            title={category.title}
            imageSrc={category.imageSrc}
          />
        ))}
      </div>

      {/* Newsletter Form */}
      <NewsletterForm />
    </div>
  );
}
