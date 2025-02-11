import React from "react";
import Image from "next/image"; // Import the Image component from next/image

interface EmptyListProps {
  message: string;
  imageUrl?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ message, imageUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="No items"
          width={128} // Set the width of the image
          height={128} // Set the height of the image
          className="w-32 h-32 mb-4"
        />
      )}
      <p className="text-xl text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyList;