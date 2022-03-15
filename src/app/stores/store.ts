import { createContext, useContext } from "react";

import AppUserStore from "./appUserStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import TenantStore from "./tenantStore";
import UserStore from "./userStore";
import VenueStore from "./venueStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    appUserStore: AppUserStore;
    tenantStore: TenantStore;
    venueStore: VenueStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    appUserStore: new AppUserStore(),
    tenantStore: new TenantStore(),
    venueStore: new VenueStore()
}

export const StoreContext = createContext(store); //store context is an object with activityStore inside

export function useStore() { //this is a hook 
    return useContext(StoreContext);
}