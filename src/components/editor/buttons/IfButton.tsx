import { FC } from "react";
import { Button } from "../../ui/button/Button";
import styles from "./buttons.module.css";
import { TemplateAction } from "../../../hooks/useTemplateReducer";
import { TemplateActions } from "../../../consts/constants";

type Props = {
    dispatch: React.Dispatch<TemplateAction>;
};
export const IfButton: FC<Props> = ({ dispatch }) => {
    const handleClick = () => {
        dispatch({ type: TemplateActions.CREATE_CONDITION });
    };
    return (
        <Button onClick={handleClick} variant="if_else">
            <span className={styles.bold}>Click to add:</span>
            <span className={styles.green}>IF</span>
            {"[{some_variable} or expression]"}
            <span className={styles.green}>THEN</span>
            {"[then_value]"}
            <span className={styles.green}>ELSE</span>
            {"[else]"}
        </Button>
    );
};
