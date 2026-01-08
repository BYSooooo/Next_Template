import { createStore } from "zustand";

export type TestState = {
    count : number
};

export const defaultInitState: TestState = {
    count : 0
}

export const createTestStore = (initState : TestState) => {
    return create
}