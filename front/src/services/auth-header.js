import Cookies from 'js-cookie'

const authHeader = () => {
    const user = JSON.parse(Cookies.get('access_token') || "{}")

    return !!user.accessToken ? { 'x-access-token': user.accessToken } : {}
}

export default authHeader;
