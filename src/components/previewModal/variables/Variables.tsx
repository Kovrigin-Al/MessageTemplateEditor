import { FC } from "react";
import { Input } from "../../ui/input/Input";
import styles from "./variables.module.css";

interface Props {
    variableNames: string[];
    dispatch: React.Dispatch<{
        inputName: string;
        value: string;
    }>;
    state: {
        [x: string]: string;
    };
}

export const Variables: FC<Props> = ({ variableNames, dispatch, state }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ inputName: e.target.id, value: e.target.value });
    };

    return (
        <div className={styles.variablesContainer}>
            {variableNames.map((name) => (
                <Input
                    key={name}
                    value={state[name]}
                    name={name}
                    id={name}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
};
