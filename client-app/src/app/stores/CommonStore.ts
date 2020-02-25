import { RootStore } from "./RootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        // persisting login when refresh
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    // pour avoir facilement accès au token
    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}