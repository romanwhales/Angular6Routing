import {InjectionToken} from "@angular/core";
export enum MODES{
    CREATE,EDIT
}
export class SharedState{
    constructor(public mode:MODES, public id ?: number){

    }
    // mode: MODES = MODES.EDIT;
    // id:number;
}

export const SHARED_STATE = new InjectionToken("shared_state");