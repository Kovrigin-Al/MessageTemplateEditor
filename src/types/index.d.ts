type ITemplate = Readonly<{
    conditionsById: IConditionsById,
    bodiesById: IBodiesById;
    focusedTextareaRef: HTMLTextAreaElement;
}>;

interface IBody {
    start: string,
    conditionId?: string,
    endBodyId?: string;
}

interface ICondition {
    ifBodyId: string;
    thenBodyId: string;
    elseBodyId: string;
}

interface IBodiesById {
    [id: string]: IBody;
}

interface IConditionsById {
    [id: string]: ICondition;
}

