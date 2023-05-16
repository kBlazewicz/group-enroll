var isLoggedIn = false;
var token = "";
var username = "";
var studentId = -1;
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

    setStudentId: function (newStudentId: number) {
        studentId = newStudentId;
        localStorage.setItem("studentId", newStudentId.toString());
    },

    getStudentId: function () {
        return studentId;
    },

    setLoginStatusCallback: function (callback: (isLoggedIn: boolean) => void) {
        loginStatusCallback = callback;
    },

    initializeFromLocalStorage: function () {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");
        const storedStudentId = localStorage.getItem("studentId");

        if (storedIsLoggedIn === "true" && storedToken && storedUsername) {
            isLoggedIn = true;
            token = storedToken;
            username = storedUsername;
        }
        if (storedStudentId) {
            studentId = parseInt(storedStudentId);
        }
    },
};

AuthManagerService.initializeFromLocalStorage();
