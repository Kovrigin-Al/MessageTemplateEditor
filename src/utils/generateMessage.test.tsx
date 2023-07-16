import { expect, test } from "vitest";
import { generateMessage } from "./generateMessage";
const template: ITemplate = {
    bodiesById: {
        startTextarea: {
            start: "Hello {firstname}!\n\nI just went through your profile and I would love to join your network!\n\n",
            conditionId: "b1b776d6-f2b3-451b-9ce4-b043eba09a21",
            endBodyId: "eb24711b-158e-47e5-89a4-ac1e72d72822",
        },
        "e1a3454d-6e5b-4f1d-a0e0-866dde344f4d": { start: "{test}" },
        "0e0f79cd-b27a-4f29-ae9e-0f8253c3945b": { start: "lastname exists {lastname}" },
        "52a69a64-9db0-4b66-8572-19389c483635": { start: " lastname is empty" },
        "eb24711b-158e-47e5-89a4-ac1e72d72822": {
            start: "\n\nJake\nSoftware Developer\njakelennard911@gmail.com",
        },
        "26d698b2-1965-46ee-9e29-19d69c6a6fdf": { start: "{company}" },
        "79214979-87e5-4260-b1ce-663d7eac5aef": {
            start: "I know you work at {company}",
            conditionId: "0a27a16d-5bfe-40aa-a01e-0e1e7bbf32e5",
            endBodyId: "b31be13b-cbc5-4c05-a3aa-df47fc8d3121",
        },
        "b4404c39-0cc3-4575-a290-b822ab64a80a": {
            start: "Where do you work at the moment?",
        },
        "b31be13b-cbc5-4c05-a3aa-df47fc8d3121": { start: " :)" },
        "c0761046-27f5-471c-8b3b-1add37766655": { start: "{position}" },
        "5c966c62-460c-4780-8318-5d96966f3b9a": { start: " as {position}" },
        "d9d25db9-3be2-4785-ab34-5ddcbc217f9c": { start: ", but what is your role?" },
    },
    conditionsById: {
        "681ddd48-500f-4814-be82-d5cc3416e615": {
            ifBodyId: "e1a3454d-6e5b-4f1d-a0e0-866dde344f4d",
            thenBodyId: "0e0f79cd-b27a-4f29-ae9e-0f8253c3945b",
            elseBodyId: "52a69a64-9db0-4b66-8572-19389c483635",
        },
        "b1b776d6-f2b3-451b-9ce4-b043eba09a21": {
            ifBodyId: "26d698b2-1965-46ee-9e29-19d69c6a6fdf",
            thenBodyId: "79214979-87e5-4260-b1ce-663d7eac5aef",
            elseBodyId: "b4404c39-0cc3-4575-a290-b822ab64a80a",
        },
        "0a27a16d-5bfe-40aa-a01e-0e1e7bbf32e5": {
            ifBodyId: "c0761046-27f5-471c-8b3b-1add37766655",
            thenBodyId: "5c966c62-460c-4780-8318-5d96966f3b9a",
            elseBodyId: "d9d25db9-3be2-4785-ab34-5ddcbc217f9c",
        },
    },
    focusedTextareaRef: {} as HTMLTextAreaElement,
};
const variables: { [key: string]: string } = {
    firstname: "",
    lastname: "",
    company: "",
    position: "",
};

test("is correct with no variables set", () => {
    const result = generateMessage(template, variables);
    expect(result).toBe(`Hello !

I just went through your profile and I would love to join your network!

Where do you work at the moment?

Jake
Software Developer
jakelennard911@gmail.com`);
});

test("is correct when name is filled", () => {
    variables.firstname = "Bill";
    console.log(variables);
    const result = generateMessage(template, variables);
    expect(result).toBe(
        `Hello Bill!

I just went through your profile and I would love to join your network!

Where do you work at the moment?

Jake
Software Developer
jakelennard911@gmail.com`
    );
});

test("is correct when name and company are filled", () => {
    variables.firstname = "Bill";
    variables.company = "Bill & Melinda Found";
    const result = generateMessage(template, variables);
    expect(result).toBe(
        `Hello Bill!

I just went through your profile and I would love to join your network!

I know you work at Bill & Melinda Found, but what is your role? :)

Jake
Software Developer
jakelennard911@gmail.com`
    );
});

test("is correct when name, company and position are filled", () => {
    variables.firstname = "Bill";
    variables.company = "Bill & Melinda Found";
    variables.position = "Co-chair";
    const result = generateMessage(template, variables);
    expect(result).toBe(
        `Hello Bill!

I just went through your profile and I would love to join your network!

I know you work at Bill & Melinda Found as Co-chair :)

Jake
Software Developer
jakelennard911@gmail.com`
    );
});

test("is correct when all variables are filled", () => {
    variables.firstname = "Bill";
    variables.lastname = "Gates";
    variables.company = "Bill & Melinda Found";
    variables.position = "Co-chair";
    const result = generateMessage(template, variables);
    expect(result).toBe(
        `Hello Bill!

I just went through your profile and I would love to join your network!

I know you work at Bill & Melinda Found as Co-chair :)

Jake
Software Developer
jakelennard911@gmail.com`
    );
});
