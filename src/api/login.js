import axios from '../http'


export function login(username, password) {
    return axios({
        url: `/login/auth?username=${username}&password=${password}`,
        method: 'get'
    })
}

export function getUserInfo(token) {
    return axios({
        url: `/user/info`,
        method: 'get'
    })
}

export function logout(token) {
    return axios({
        url: `/user/logout`,
        method: 'post',
        data: {
            token //token: token
        }
    })
}


