import { useReducer } from "react";

export const useInputsReducer = (variableNames: string[]) => {
    const reducer = (
        state: { [key: string]: string; },
        { inputName, value }: { inputName: string; value: string; }
    ) => {
        return { ...state, [inputName]: value };
    };

    const createInitialState = (variableNames: string[]) => {
        const state: { [key: string]: string; } = {};
        variableNames.forEach((i) => {
            state[i] = "";
        });
        return state;
    };

    return useReducer(reducer, variableNames, createInitialState);
};