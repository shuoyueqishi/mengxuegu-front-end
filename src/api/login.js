import axios from '../http'


export function login(username, password) {
    return axios({
        url: `/login/auth?username=${username}&password=${password}`,
        method: 'get'
    })
}


