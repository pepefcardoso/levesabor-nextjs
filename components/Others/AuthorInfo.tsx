import React from "react";
import Image from "next/image";

interface AuthorInfoProps {
    authorName: string;
    authorImage?: string | null;
    postDate: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ authorName, authorImage, postDate }) => {
    const fallbackLetter = authorName ? authorName.charAt(0).toUpperCase() : "A";

    return (
        <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {authorImage ? (
                    <Image
                        src={authorImage}
                        alt={authorName}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-lg font-semibold text-gray-700">{fallbackLetter}</span>
                )}
            </div>

            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{"Por " + authorName}</span>
                <span className="text-xs text-gray-500">{postDate}</span>
            </div>
        </div>
    );
};

export default AuthorInfo;