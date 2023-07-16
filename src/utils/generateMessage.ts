
class MessageGenerator {
    private _result = '';

    constructor(
        private template: ITemplate, private values: { [key: string]: string; }
    ) { }

    get result() {
        this.parseById('startTextarea');
        return this._result;
    }

    private replaceVariables = (text: string) => {
        return text.replace(/\{(\w+)\}/g, (match, variableFound) => {
            return Object.prototype.hasOwnProperty.call(this.values, variableFound)
                ? this.values[variableFound] : match;
        });
    };

    private addToResult = (text: string) => {
        const textWithReplacedVariables = this.replaceVariables(text);
        this._result += textWithReplacedVariables ? this.replaceVariables(text) : '';
    };

    private parseById = (bodyId: string) => {
        const { start, conditionId, endBodyId } = this.template.bodiesById[bodyId];
        this.addToResult(start);
        if (conditionId && this.template.conditionsById[conditionId]) {
            const { ifBodyId, thenBodyId, elseBodyId } = this.template.conditionsById[conditionId];
            this.parseById(this.parseIf(ifBodyId) ? thenBodyId : elseBodyId);
        }
        endBodyId && this.parseById(endBodyId);
    };

    private parseIf = (ifBodyId: string) => {
        const ifBody = this.template.bodiesById[ifBodyId];
        return !!ifBody && !!this.replaceVariables(ifBody.start);
    };

}

export const generateMessage = (template: ITemplate, values: { [key: string]: string; }) => {
    const messageGenerator = new MessageGenerator(template, values);
    return messageGenerator.result;
};
