import { FC, Suspense } from "react";
import { Button } from "../../ui/button/Button";
import styles from "./buttons.module.css";

type Props = {
    setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    saveTemplate: () => void;
};

export const MainButtons: FC<Props> = ({
    setIsEditorOpen,
    setIsModalOpen,
    saveTemplate,
}) => {
    const closeEditor = () => setIsEditorOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <div className={styles.mainButtonsContainer}>
            <Button onClick={openModal} variant="main">
                Preview
            </Button>
            <Button onClick={saveTemplate} variant="main">
                <Suspense fallback="Saving...">Save</Suspense>
            </Button>
            <Button onClick={closeEditor} variant="main">
                Close
            </Button>
        </div>
    );
};
