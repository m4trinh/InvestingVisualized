import { AccountAction } from "../ActionModel";

export interface InfoRESP {
    actions: AccountAction[],
    yearCreate: number
}
