import { produce } from "immer";
import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Consts, TemplateActions } from "../consts/constants";



export type TemplateAction =
    | {
        type: TemplateActions.CHANGE_FOCUSED_BODY;
        payload: string;
    }
    | {
        type: TemplateActions.CREATE_CONDITION;
    }
    | {
        type: TemplateActions.DELETE_CONDITION;
        payload: string;
    }
    | {
        type: TemplateActions.ADD_VARIABLE;
        payload: string;
    }
    | {
        type: TemplateActions.SET_FOCUSED_REF;
        payload: HTMLTextAreaElement;
    };

const reducer = (state: ITemplate, action: TemplateAction) => {
    return produce(state, (newState) => {
        switch (action.type) {

            case TemplateActions.CHANGE_FOCUSED_BODY: {
                newState.bodiesById[state.focusedTextareaRef.id].start = action.payload;
                break;
            }

            case TemplateActions.SET_FOCUSED_REF: {
                newState.focusedTextareaRef = action.payload as unknown as typeof newState.focusedTextareaRef;
                break;
            }

            case TemplateActions.ADD_VARIABLE: {
                if (state.focusedTextareaRef) {
                    const body = state.bodiesById[state.focusedTextareaRef.id].start;
                    const caretPosition = state.focusedTextareaRef.selectionStart;
                    const newString = body.substring(0, caretPosition) + action.payload + body.substring(caretPosition);

                    newState.bodiesById[state.focusedTextareaRef.id].start = newString;

                    //move caret to correct position asynchronously
                    setTimeout(() => {
                        const newPosition = caretPosition + action.payload.length;
                        state.focusedTextareaRef.selectionStart = newPosition;
                        state.focusedTextareaRef.selectionEnd = newPosition;
                        state.focusedTextareaRef.focus();
                    });
                } else {
                    //place to the very beginning
                    const body = state.bodiesById[Consts.START_TEXTAREA].start;
                    const caretPosition = 0;
                    const newString = body.substring(0, caretPosition) + action.payload + body.substring(caretPosition);
                    newState.bodiesById[Consts.START_TEXTAREA].start = newString;
                }
                break;
            }

            case TemplateActions.CREATE_CONDITION: {
                const bodyId = state.focusedTextareaRef.id;
                const { start: body, conditionId, endBodyId } = state.bodiesById[bodyId];
                const caretPosition = state.focusedTextareaRef.selectionStart;
                const [newConditionId, newEndBodyId, newIfBodyId, newThenBodyId, newElseBodyId] =
                    Array(5).fill('').map(_ => uuidv4());

                if (conditionId == undefined && endBodyId == undefined) { //means none conditional block below
                    newState.bodiesById[bodyId] = {
                        start: body.substring(0, caretPosition),
                        conditionId: newConditionId, endBodyId: newEndBodyId
                    };
                    newState.bodiesById[newEndBodyId] = { start: body.substring(caretPosition) };
                }
                else {
                    newState.bodiesById[bodyId] = {
                        start: body.substring(0, caretPosition),
                        conditionId: newConditionId, endBodyId: newEndBodyId
                    };
                    newState.bodiesById[newEndBodyId] = {
                        start: body.substring(caretPosition),
                        conditionId, endBodyId
                    };
                }

                newState.conditionsById[newConditionId] = {
                    ifBodyId: newIfBodyId,
                    thenBodyId: newThenBodyId,
                    elseBodyId: newElseBodyId
                };
                [newIfBodyId, newThenBodyId, newElseBodyId].forEach(id => {
                    newState.bodiesById[id] = { start: '' };
                });

                break;
            }

            case TemplateActions.DELETE_CONDITION: {
                const { endBodyId: parentEndId, conditionId: parentCondition, start: parentStart } = state.bodiesById[action.payload];
                const deepDeleteById = (id: string) => {
                    const { conditionId, endBodyId } = state.bodiesById[id];
                    if (conditionId) {
                        for (const id in state.conditionsById[conditionId]) {
                            deepDeleteById(id);
                        }
                        delete newState.conditionsById[conditionId];
                    }
                    if (endBodyId) {
                        for (const id in state.bodiesById[endBodyId]) {
                            deepDeleteById(id);
                        }
                    }
                    delete newState.bodiesById[id];
                };

                //merge two field around the IF 
                newState.bodiesById[action.payload] = {
                    ...state.bodiesById[parentEndId!],
                    start: parentStart + state.bodiesById[parentEndId!].start,
                };
                delete newState.bodiesById[parentEndId!];

                for (const id in state.bodiesById[parentCondition!]) {
                    deepDeleteById(id);
                }

                break;
            }

            default:
                break;
        }
    });
};

export function useTemplateReducer(startTemplate: ITemplate) {
    return useReducer(reducer, startTemplate);

}