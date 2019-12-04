/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
            localStorage.removeItem('user');
            state.user = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
            localStorage['title'] = data;
        },
        [types.USRE]: (state, data) => {
            state.user = data;
            localStorage['user'] = data;
        }
    }
})