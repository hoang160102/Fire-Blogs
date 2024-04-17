export const state = {
    isAllowEdit: null
}

export const mutations = {
    toggleAllowEdit(state, payload) {
        state.isAllowEdit = payload 
    }
}