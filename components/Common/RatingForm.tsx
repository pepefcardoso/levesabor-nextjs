"use client";

import React, { useState } from "react";
import { ratingsService } from "@/services/index";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import clsx from "clsx";
import { MorphableTypeEnum } from "@/typings/enums";

interface RatingFormProps {
    initialRating?: number;
    rateableId: string;
    rateableType: MorphableTypeEnum;
}

const RatingForm = ({
    initialRating = 0,
    rateableId,
    rateableType,
}: RatingFormProps) => {
    const [rating, setRating] = useState(initialRating);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center">
                <span className="text-gray-500">Faça login para avaliar</span>
            </div>
        );
    }

    const handleRating = async (newRating: number) => {
        setRating(newRating);
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append("rating", newRating.toString());
            data.append("rateable_id", rateableId);
            data.append("rateable_type", rateableType);

            if (initialRating === 0) {
                await ratingsService.create(data);
            } else {
                await ratingsService.update(rateableId, data);
            }
            toast.success("Avaliação registrada");
        } catch (err) {
            console.error("Erro ao registrar avaliação", err);
            toast.error("Erro ao registrar avaliação");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    disabled={isSubmitting}
                    className={clsx(
                        "focus:outline-none",
                        "hover:text-yellow-400 hover:cursor-pointer",
                        "transition-colors duration-200",
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                    )}
                >
                    <FaStar />
                </button>
            ))}
        </div>
    );
};

export default RatingForm;
