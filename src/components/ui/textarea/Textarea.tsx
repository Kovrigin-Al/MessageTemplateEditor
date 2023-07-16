import React, { FC, useRef } from "react";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import styles from "./textarea.module.css";
import { TemplateAction } from "../../../hooks/useTemplateReducer";
import { TemplateActions } from "../../../consts/constants";

interface IProps extends TextareaAutosizeProps {
    value: string;
    id: string;
    dispatch: React.Dispatch<TemplateAction>;
}

export const Textarea: FC<IProps> = ({ dispatch, value, ...props }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: TemplateActions.CHANGE_FOCUSED_BODY,
            payload: e.target.value,
        });
    };
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
        dispatch({
            type: TemplateActions.SET_FOCUSED_REF,
            payload: e.target,
        });
    };

    return (
        <TextareaAutosize
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            className={styles.textarea}
            {...props}
        />
    );
};
