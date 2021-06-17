import Cookies from 'js-cookie'

const authCheck = () => {
    const user = JSON.parse(Cookies.get('access_token') || "{}")
    // console.log("desde auth", user)

    return !!user.accessToken ? true : false
}

export default authCheck;
