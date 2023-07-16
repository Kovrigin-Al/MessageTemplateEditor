import { ReactNode, FC, createContext, useContext } from "react";
import { TemplateAction, useTemplateReducer } from "../hooks/useTemplateReducer";
import { getInitialState } from "../utils/getState";

interface IEditorContext {
    template: ITemplate;
    dispatch: React.Dispatch<TemplateAction>;
    arrVarNames: string[];
}

interface IProps {
    children: ReactNode;
}

const [startTemplate, arrVarNames] = getInitialState();
export const EditorContext = createContext<IEditorContext>({} as IEditorContext);

export const EditorProvider: FC<IProps> = ({ children }) => {
    const [state, dispatch] = useTemplateReducer(startTemplate);
    return (
        <EditorContext.Provider value={{ template: state, dispatch, arrVarNames }}>
            {children}
        </EditorContext.Provider>
    );
};

export function useEditorContext() {
    return useContext(EditorContext);
}
