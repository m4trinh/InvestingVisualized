import { AccountAction } from "./ActionModel";

export interface AccountInfo {
    actions: AccountAction[],
    yearBorn: number,
};