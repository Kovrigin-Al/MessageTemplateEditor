import { Consts } from "../consts/constants";



// export function getState () {
//     let arrVarNames = ['']
//     const savedVarNamesJson = localStorage.getItem('arrVarNames');
//     const savedVarNames = JSON.parse(savedVarNames)
//     if (savedVarNames && isArrayOfStrings(JSON.parse(savedVarNames))) {
//         arrVarNames = savedVarNames
//     }



// }



// const arrVarNames = localStorage.arrVarNames
//     ? JSON.parse(localStorage.arrVarNames)
//     : defaultArrVarNames;

// const startTemplate: ITemplate = localStorage.template
//     ? {
//         focusedTextareaRef: document.getElementById(
//             Consts.START_TEXTAREA
//         ) as HTMLTextAreaElement,
//         ...JSON.parse(localStorage.template),
//     }
//     : defaultTemplate;


class InitialState {
    private defaultVarNames = ["firstname", "lastname", "company", "position"];
    private defaultTemplate: ITemplate = {
        focusedTextareaRef: document.getElementById(
            Consts.START_TEXTAREA
        ) as HTMLTextAreaElement,
        bodiesById: { startTextarea: { start: "" } },
        conditionsById: {},
    };
    private varNamesFound = localStorage.getItem('arrVarNames');
    private templateFound = localStorage.getItem('template');

    private isArrayOfStrings = (variable: unknown): variable is string[] => {
        return Array.isArray(variable) && !variable.some(i => typeof i !== 'string');
    };

    private getVarNames = () => {
        if (this.varNamesFound) {
            const varNames = JSON.parse(this.varNamesFound);
            return this.isArrayOfStrings(varNames) ? varNames : this.defaultVarNames;
        } else {
            return this.defaultVarNames;
        }
    };

    private getTemplate = () => {
        if (this.templateFound) {
            const template = JSON.parse(this.templateFound);
            return {
                ...template, focusedTextareaRef: document.getElementById(
                    Consts.START_TEXTAREA
                ) as HTMLTextAreaElement,
            } as ITemplate;
        } else {
            return this.defaultTemplate;
        }
    };

    public getState = (): [ITemplate, string[]] => {
        return [this.getTemplate(), this.getVarNames()];
    };

}

export const getInitialState = () => {
    const initialState = new InitialState();
    return initialState.getState();
};