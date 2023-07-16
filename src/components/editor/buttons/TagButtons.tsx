import { FC } from "react";
import { Button } from "../../ui/button/Button";
import { TemplateAction } from "../../../hooks/useTemplateReducer";
import { TemplateActions } from "../../../consts/constants";

type Props = {
    arrVarNames: string[];
    dispatch: React.Dispatch<TemplateAction>;
};
export const TagButtons: FC<Props> = ({ arrVarNames, dispatch }) => {
    const handleClick = (value: string) => {
        dispatch({ type: TemplateActions.ADD_VARIABLE, payload: value });
    };

    const preventDefault = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    };

    return (
        <>
            {arrVarNames.map((name) => (
                <Button
                    onClick={() => handleClick(`{${name}}`)}
                    onMouseDown={preventDefault}
                    key={name}
                    variant="tags"
                >{`{${name}}`}</Button>
            ))}
        </>
    );
};
