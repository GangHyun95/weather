import React, { ReactNode } from "react";
import styles from './Card.module.css'

export default function Card({
    children,
    size = "large",
}: {
    children: ReactNode;
    size?: "large" | "small";
}) {
    const sizeClassMap: { [key: string]: string } = {
        large: "card-lg",
        small: "card-sm",
    };

    const className = sizeClassMap[size] || "";
    return <div className={`${styles.card} ${styles[className]}`}>{children}</div>;
}
