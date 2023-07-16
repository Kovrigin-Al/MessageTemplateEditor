import { FC } from "react";
import styles from "./previewModal.module.css";
import { Modal } from "../ui/modal/Modal";
import { useEditorContext } from "../../context/EditorContext";
import TextareaAutosize from "react-textarea-autosize";
import { Variables } from "./variables/Variables";
import { Button } from "../ui/button/Button";
import { generateMessage } from "../../utils/generateMessage";
import { useInputsReducer } from "../../hooks/useInputsReducer";

type Props = {
    isOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PreviewModal: FC<Props> = ({ isOpen, setIsModalOpen }) => {
    const { arrVarNames, template } = useEditorContext();
    const [state, dispatch] = useInputsReducer(arrVarNames);
    const value = generateMessage(template, state);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal isOpen={isOpen} setIsModalOpen={setIsModalOpen}>
            <h1 className={styles.title}>Message Preview</h1>
            <TextareaAutosize className={styles.textarea} value={value} disabled />
            <Variables variableNames={arrVarNames} dispatch={dispatch} state={state} />
            <div className={styles.buttonContainer}>
                <Button onClick={closeModal} variant="main">
                    Close
                </Button>
            </div>
        </Modal>
    );
};
