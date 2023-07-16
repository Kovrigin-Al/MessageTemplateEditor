import { FC, HTMLAttributes } from "react";
import styles from "./input.module.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({ name, ...props }) => {
    return (
        <div className={styles.container}>
            <br />
            <input {...props} type="text" className={styles.inputText} required />
            <span className={styles.label}>{name}</span>
        </div>
    );
};
