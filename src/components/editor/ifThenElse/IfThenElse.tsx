import { FC } from "react";
import { useEditorContext } from "../../../context/EditorContext";
import { Textarea } from "../../ui/textarea/Textarea";
import styles from "./ifThenElse.module.css";
import { Button } from "../../ui/button/Button";
import { TemplateActions } from "../../../consts/constants";

type Props = {
    ifId: string;
    thenId: string;
    elseId: string;
    parentBodyId: string;
};

export const IfThenElse: FC<Props> = ({ elseId, ifId, thenId, parentBodyId }) => {
    const { template, dispatch } = useEditorContext();
    const handleDeleteCondition = () => {
        dispatch({ type: TemplateActions.DELETE_CONDITION, payload: parentBodyId });
    };

    return (
        <>
            <div className={styles.ifThenElseContainer}>
                <div className={styles.deleteBtn}>
                    <Button onClick={handleDeleteCondition}>X</Button>
                </div>
                {[ifId, thenId, elseId].map((bodyId, index) => {
                    const { start, conditionId, endBodyId } = template.bodiesById[bodyId];
                    if (conditionId && endBodyId) {
                        const conditionBody = template.conditionsById[conditionId];
                        const endBody = template.bodiesById[endBodyId];
                        return (
                            <div key={bodyId} className={styles.optionContainer}>
                                <span className={styles.tag}>
                                    {["IF", "THEN", "ELSE"][index]}
                                </span>
                                <div className={styles.ifThenElseContainer}>
                                    <Textarea
                                        dispatch={dispatch}
                                        id={bodyId}
                                        value={start}
                                    />
                                    <IfThenElse
                                        parentBodyId={bodyId}
                                        ifId={conditionBody.ifBodyId}
                                        thenId={conditionBody.thenBodyId}
                                        elseId={conditionBody.elseBodyId}
                                    />
                                    <Textarea
                                        dispatch={dispatch}
                                        id={endBodyId}
                                        value={endBody.start}
                                    />
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={bodyId} className={styles.optionContainer}>
                            <span className={styles.tag}>
                                {["IF", "THEN", "ELSE"][index]}
                            </span>
                            <Textarea dispatch={dispatch} id={bodyId} value={start} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
