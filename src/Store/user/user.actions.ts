import { LocalUser } from "./user.types";
import { createAction } from "../../Utils/Reducer/reducer";

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "user/SET_CURRENT_USER",
};

export const setCurrentUser = (user: LocalUser | undefined) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
