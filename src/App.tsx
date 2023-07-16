import { useState } from "react";
import styles from "./App.module.css";
import { Button } from "./components/ui/button/Button";
import { Editor } from "./components/editor/Editor";
import { EditorProvider } from "./context/EditorContext";

function App() {
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const togglePage = () => {
        setIsEditorOpen((prev) => !prev);
    };

    if (isEditorOpen) {
        return (
            <EditorProvider>
                <Editor setIsEditorOpen={setIsEditorOpen} />
            </EditorProvider>
        );
    }

    return (
        <div className={styles.container}>
            <Button onClick={togglePage}>Message Editor</Button>
        </div>
    );
}

export default App;
