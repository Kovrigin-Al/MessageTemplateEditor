import { FC, useState } from "react";
import styles from "./editor.module.css";
import { IfButton } from "./buttons/IfButton";
import { TagButtons } from "./buttons/TagButtons";
import { MessageTemplate } from "./messageTemplate/MessageTemplate";
import { useEditorContext } from "../../context/EditorContext";
import { MainButtons } from "./buttons/MainButtons";
import { PreviewModal } from "../previewModal/PreviewModal";
import { callbackSave } from "../../utils/callbackSave";
import { Consts } from "../../consts/constants";

type Props = {
    setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Editor: FC<Props> = ({ setIsEditorOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { arrVarNames, dispatch, template } = useEditorContext();

    const saveTemplate = () => {
        callbackSave(template);
    };

    return (
        <div className={styles.editorContainer}>
            <h1 className={styles.title}>Message Template Editor</h1>
            <div className={styles.variablesContainer}>
                <TagButtons arrVarNames={arrVarNames} dispatch={dispatch} />
            </div>
            <IfButton dispatch={dispatch} />
            <div className={styles.templateContainer}>
                <MessageTemplate bodyId={Consts.START_TEXTAREA} />
            </div>
            <MainButtons
                setIsEditorOpen={setIsEditorOpen}
                setIsModalOpen={setIsModalOpen}
                saveTemplate={saveTemplate}
            />
            {isModalOpen && (
                <PreviewModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};
