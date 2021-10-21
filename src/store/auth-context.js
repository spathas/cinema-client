import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: {},
  token: "",
  authExpires: "",
  isLogin: false,
  login: (user, authExpires) => {},
  logout: () => {},
});

const initUser = JSON.parse(localStorage.getItem("user"));
const initToken = JSON.parse(localStorage.getItem("token"));
const initExpired = JSON.parse(localStorage.getItem("expireToken"));

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initUser);
  const [token, setToken] = useState(initToken);
  const [authExpires, setAuthExpires] = useState(initExpired);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("expireToken", JSON.stringify(authExpires));
    if (
      !!user &&
      new Date(authExpires).getTime() > new Date(Date.now()).getTime()
    ) {
      setIsLogin(true);
    }
  }, [user, authExpires, isLogin, token]);

  const loginHandler = (innerUser, innerToken, innerExpires) => {
    setUser(innerUser);
    setToken(innerToken);
    setAuthExpires(new Date(innerExpires).getTime());

    if (
      !!user &&
      new Date(innerExpires).getTime() > new Date(Date.now()).getTime()
    ) {
      setIsLogin(true);
    }
  };

  const logoutHandler = () => {
    setUser({});
    setToken("");
    setAuthExpires("");
    setIsLogin(false);
  };

  const contetxtValue = {
    user,
    token,
    authExpires,
    isLogin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contetxtValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
