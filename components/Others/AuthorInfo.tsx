import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";

interface AuthorInfoProps {
    authorName: string;
    authorImage?: string | null;
    postDate: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ authorName, authorImage, postDate }) => {
    const fallbackLetter = authorName ? authorName.charAt(0).toUpperCase() : "A";
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="flex items-center space-x-3">
            <div className="relative shadow-md w-10 h-10 rounded-full overflow-hidden bg-tertiary flex items-center justify-center">
                {authorImage && !imageError ? (
                    <Image
                        src={authorImage}
                        alt={authorName}
                        fill
                        className="object-cover"
                        onError={handleImageError}
                    />
                ) : (
                    <span
                        className={clsx(
                            Typography.Title,
                            "flex items-center justify-center w-full h-full"
                        )}
                    >
                        {fallbackLetter}
                    </span>
                )}
            </div>

            <div className="flex flex-col">
                <span className={clsx(Typography.Subtitle)}>{authorName}</span>
                <span className={clsx(Typography.Caption, txtColors.gray700)}>
                    {postDate}
                </span>
            </div>
        </div>
    );
};

export default AuthorInfo;