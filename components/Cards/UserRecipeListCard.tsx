"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RecipeDifficultyEnum } from "../../typings/api";

interface UserRecipeListCardProps {
    recipe: {
        id: string;
        title: string;
        image?: { url: string };
        category?: { name: string };
        difficulty: number;
    };
    handleDelete: (recipeId: string) => void;
}

const UserRecipeListCard: React.FC<UserRecipeListCardProps> = ({
    recipe,
    handleDelete,
}) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/recipes/${recipe.id}`}>
                <div>
                    {recipe.image?.url && (
                        <div className="relative w-full h-48">
                            <Image
                                src={recipe.image.url}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {recipe.category?.name}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {RecipeDifficultyEnum[recipe.difficulty]}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-end gap-2 p-4">
                <Link
                    href={`/user/recipes/update/${recipe.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                </Link>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default UserRecipeListCard;