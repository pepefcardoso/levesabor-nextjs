"use client";

import React from "react";
import FilledButton from "../Buttons/FilledButton";

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
                backgroundColor="bg-white"
                fontColor="gray-700"
                disabled={currentPage === 1}
                loading={false}
            />

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                    <FilledButton
                        key={page}
                        text={String(page)}
                        onClick={() => onPageChange(page)}
                        type="button"
                        backgroundColor={currentPage === page ? "bg-blue-500" : "bg-white"}
                        fontColor={currentPage === page ? "white" : "gray-700"}
                        disabled={false}
                        loading={false}
                    />
                );
            })}

            <FilledButton
                text={nextLabel}
                onClick={() => onPageChange(currentPage + 1)}
                type="button"
                backgroundColor="bg-white"
                fontColor="gray-700"
                disabled={currentPage === totalPages}
                loading={false}
            />
        </div>
    );
};

export default CustomPaginator;
