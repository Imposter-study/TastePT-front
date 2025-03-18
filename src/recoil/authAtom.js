import { atom } from "recoil";

export const isAuthenticated = atom({
  key: "isAuthenticated",
  default: false,
});

export const authUser = atom({
  key: "authUser",
  default: {},
});
