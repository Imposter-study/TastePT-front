import { atom } from "recoil";

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: null,
});

export const authUser = atom({
  key: "authUser",
  default: {},
});
