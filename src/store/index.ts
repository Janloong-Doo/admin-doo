import {createStore} from "vuex";


const store=createStore({

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

export default store;