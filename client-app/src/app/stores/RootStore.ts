import { ActivityStore } from "./ActivityStore";
import UserStore from "./UserStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./CommonStore";

// strict mode de MobX sur les fonctions asynchrones
configure({ enforceActions: "always" });

// le store qui regroupe tous les stores de l'app
export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());