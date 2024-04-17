import { mapState, mapActions } from "vuex";
export const authComputed = {
    ...mapState('users/auth', ["currentUser", "listUsers"])
}

export const authMethods = {
    ...mapActions('users/auth', ["register"])
}