import {createStore} from "vuex";


export default createStore({

    state() {
        return {
            token: ""
        }
    },
    mutations: {
        setToken(state, token) {
            // state.token = token;
        },
    },
    actions: {},
});
