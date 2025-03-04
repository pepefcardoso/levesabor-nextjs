"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface TransitionWrapperProps {
    children: ReactNode;
}

const springConfig = {
    type: "spring",
    damping: 20,
    stiffness: 300,
    mass: 0.5,
};

const animationVariants = {
    initial: {
        opacity: 0,
        y: 16,
        scale: 0.995,
        filter: "blur(0.4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: springConfig,
    },
    exit: {
        opacity: 0,
        y: -16,
        scale: 0.995,
        filter: "blur(0.4px)",
        transition: { ...springConfig, velocity: 2 },
    },
};

export default function TransitionWrapper({ children }: TransitionWrapperProps) {
    const pathname = usePathname();
    const handleExitComplete = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={handleExitComplete}
        >
            <motion.div
                key={pathname}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="origin-top"
                style={{ willChange: "transform, opacity, filter" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}