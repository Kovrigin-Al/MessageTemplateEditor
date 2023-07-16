import { ButtonHTMLAttributes, FC } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "tags" | "main" | "if_else" | "default";
}

export const Button: FC<Props> = ({ children, variant = "default", ...props }) => {
    const classname = clsx(
        styles.common,
        variant === "default" && styles.default,
        variant === "main" && styles.main,
        variant === "tags" && styles.variableTagBtn,
        variant === "if_else" && styles.ifThenElse
    );
    return (
        <button className={classname} {...props}>
            {children}
        </button>
    );
};
