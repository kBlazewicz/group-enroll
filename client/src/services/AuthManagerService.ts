var isLoggedIn = false;
var token = "";
var username = "";
var loginStatusCallback: (isLoggedIn: boolean) => void = () => { };

export const AuthManagerService = {
    isLoggedIn: function () {
        return isLoggedIn;
    },

    logIn: function () {
        isLoggedIn = true;
        loginStatusCallback(isLoggedIn);
        localStorage.setItem("isLoggedIn", "true");
    },

    logOut: function () {
        isLoggedIn = false;
        this.setToken("");
        loginStatusCallback(isLoggedIn);
        localStorage.setItem("isLoggedIn", "false");
    },

    getToken: function () {
        return token;
    },

    setToken: function (newToken: string) {
        token = newToken;
        localStorage.setItem("token", newToken);
    },

    setUserName: function (newUserName: string) {
        username = newUserName;
        localStorage.setItem("username", newUserName);
    },

    getUserName: function () {
        return username;
    },

    setLoginStatusCallback: function (callback: (isLoggedIn: boolean) => void) {
        loginStatusCallback = callback;
    },

    initializeFromLocalStorage: function () {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (storedIsLoggedIn === "true" && storedToken && storedUsername) {
            isLoggedIn = true;
            token = storedToken;
            username = storedUsername;
        }
    },
};

AuthManagerService.initializeFromLocalStorage();
