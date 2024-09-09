import React, { ReactNode } from "react";
import styles from './Card.module.css'

export default function Card({
    children,
    size = "large",
    className,
}: {
    children: ReactNode;
    size?: "large" | "small";
    className?: string
}) {
    const sizeClassMap: { [key: string]: string } = {
        large: "card-lg",
        small: "card-sm",
    };

    const sizeClass = sizeClassMap[size] || "";
    return <div className={`${styles.card} ${styles[sizeClass]} ${className || ""}`}>{children}</div>;
}
