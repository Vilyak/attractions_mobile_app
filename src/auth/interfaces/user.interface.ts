export interface User {
    username: string;
    password: string;
}

export interface History {
    username: string;
    states: string[];
}

export interface Route {
    username: string;
    state: Array<{state: string, name: string, w: number, h: number}>;
}