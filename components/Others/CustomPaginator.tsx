"use client";

import { FilledButtonHovers } from "@/typings/buttons";
import FilledButton from "../Buttons/FilledButton";
import { bgColors } from "@/constants/colors";

interface CustomPaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const CustomPaginator: React.FC<CustomPaginatorProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}) => {
    if (totalPages <= 1) return null;

    let pages: number[] = [];
    if (totalPages <= 5) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = startPage + 4;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 4);
        }
        pages = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    }

    return (
        <div className={`flex justify-center mt-8 flex-wrap gap-2 ${className}`}>
            <FilledButton
                text="Anterior"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                hoverAnimation={FilledButtonHovers.opacity}
            />

            {pages.map((page) => (
                <FilledButton
                    key={page}
                    text={String(page)}
                    onClick={() => onPageChange(page)}
                    color={currentPage === page ? bgColors.gray500 : bgColors.tertiary}
                    disabled={currentPage === page}
                    hoverAnimation={FilledButtonHovers.opacity}
                />
            ))}

            <FilledButton
                text="Próximo"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                hoverAnimation={FilledButtonHovers.opacity}
            />
        </div>
    );
};

export default CustomPaginator;