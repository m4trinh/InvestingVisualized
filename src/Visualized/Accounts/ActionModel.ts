export interface AccountAction {
    amount: number,
    edit: boolean,
    title: string,
    withdraw: boolean,
    year: number
}

export interface AccountGraphAction {
    title: string,
    amount: number
}