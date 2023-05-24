import { RootState } from "../rootReducer";
import { LocalUser } from "./user.types";

export const selectCurrentUser = (state: RootState): LocalUser =>
  state.user.currentUser;