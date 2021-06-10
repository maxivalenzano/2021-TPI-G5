import Cookies from 'js-cookie'

const authCheck = () => {
    const user = JSON.parse(Cookies.get('access_token') || "{}")
    // console.log("desde auth", user)

    if (user && user.accessToken) {
        return true;
    } else {
        return false;
    }
}

export default authCheck;
