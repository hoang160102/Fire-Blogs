import { mapState, mapActions } from "vuex";
export const authComputed = {
    ...mapState('users/auth', ["user", "listUsers", "errorMsg"])
}

export const authMethods = {
    ...mapActions('users/auth', ["register", "login", "resetPass", "getCurrentUser"])
}