import { FC, ReactNode } from "react";
import styles from "./modal.module.css";
type Props = {
    isOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
};

export const Modal: FC<Props> = ({ isOpen, setIsModalOpen, children }) => {
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const preventCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <div
            className={
                isOpen
                    ? `${styles.open} ${styles.modalBackground}`
                    : styles.modalBackground
            }
            onClick={closeModal}
        >
            <div
                className={
                    isOpen
                        ? `${styles.open} ${styles.modalContainer}`
                        : styles.modalContainer
                }
                onClick={preventCloseModal}
            >
                {children}
            </div>
        </div>
    );
};
