export const callbackSave: (template: ITemplate) => Promise<void> = async (template) => {
    const { bodiesById, conditionsById } = template;
    return new Promise((resolve) => {
        setTimeout(() => resolve('done'), 1000);
    }).
        then(() => localStorage.setItem('template', JSON.stringify({ bodiesById, conditionsById }))
        );
};
