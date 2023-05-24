export class LocalUser {
  name: string;
  email: string;
  isLoggedIn: boolean;

  constructor(name: string, email: string, isLoggedIn: boolean) {
    this.name = name;
    this.email = email;
    this.isLoggedIn = isLoggedIn;
  }
}

export interface UserState {
  currentUser: LocalUser;
}

export const USER_INITIAL_STATE: UserState = {
  currentUser: new LocalUser("", "", false),
};