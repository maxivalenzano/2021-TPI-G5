import Cookies from 'js-cookie'

const authHeader = () => {
    const user = JSON.parse(Cookies.get('access_token') || "{}")

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export default authHeader;
