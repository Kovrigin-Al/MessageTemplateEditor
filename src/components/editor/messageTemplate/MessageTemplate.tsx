import { FC } from "react";
import { Textarea } from "../../ui/textarea/Textarea";
import { IfThenElse } from "../ifThenElse/IfThenElse";
import { useEditorContext } from "../../../context/EditorContext";
import { Consts } from "../../../consts/constants";

type Props = { bodyId: string };

export const MessageTemplate: FC<Props> = ({ bodyId }) => {
    const { template, dispatch } = useEditorContext();
    const body = template.bodiesById[bodyId];

    if (
        // means no if-then-else blocks
        !!body &&
        !body.conditionId &&
        !body.endBodyId
    ) {
        return (
            <Textarea
                autoFocus={bodyId === Consts.START_TEXTAREA}
                dispatch={dispatch}
                value={body.start}
                id={bodyId}
            />
        );
    }

    if (body.conditionId && body.endBodyId) {
        const { ifBodyId, thenBodyId, elseBodyId } =
            template.conditionsById[body.conditionId];
        return (
            <>
                <Textarea
                    autoFocus={bodyId === Consts.START_TEXTAREA}
                    dispatch={dispatch}
                    value={body.start}
                    id={bodyId}
                />
                {!!template.conditionsById[body.conditionId] && (
                    <IfThenElse
                        parentBodyId={bodyId}
                        ifId={ifBodyId}
                        thenId={thenBodyId}
                        elseId={elseBodyId}
                    />
                )}
                <MessageTemplate bodyId={body.endBodyId} />
            </>
        );
    }
};
