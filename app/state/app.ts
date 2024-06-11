import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class AppState {
  bar_status: 'hidden' | 'show' = 'show';

  constructor() {
    makeAutoObservable(this);
  }

  setAppBar(status: 'hidden' | 'show') {
    this.bar_status = status;
  }
}

export const store = new AppState();
export const storeContext = createContext(store);
export const useAppStore = () => useContext(storeContext);

// create store