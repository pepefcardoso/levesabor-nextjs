"use client";

import React from "react";
import FilledButton from "../Buttons/FilledButton";
import { bgColors, txtColors } from "../../constants/colors";

interface CustomPaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

const CustomPaginator: React.FC<CustomPaginatorProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    previousLabel = "Anterior",
    nextLabel = "Próximo",
    className = "",
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className={`flex justify-center mt-8 flex-wrap gap-2 ${className}`}>
            <FilledButton
                text={previousLabel}
                onClick={() => onPageChange(currentPage - 1)}
                type="button"
                color={bgColors.tertiary}
                disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <FilledButton
                        key={page}
                        text={String(page)}
                        onClick={() => onPageChange(page)}
                        type="button"
                        color={bgColors.tertiary}
                        fontColor={txtColors.gray500}
                        disabled={currentPage === page}
                    />
                );
            })}

            <FilledButton
                text={nextLabel}
                onClick={() => onPageChange(currentPage + 1)}
                type="button"
                color={bgColors.tertiary}
                fontColor={txtColors.gray800}
                disabled={currentPage === totalPages}
            />
        </div>
    );
};

export default CustomPaginator;
