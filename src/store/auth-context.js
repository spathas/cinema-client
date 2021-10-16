import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: {},
  authExpires: new Date(Date.now()),
  isLogin: false,
  login: (user, authExpires) => {},
  logout: () => {},
});

const initUser = JSON.parse(localStorage.getItem("user"));
const initExpired = JSON.parse(localStorage.getItem("expireToken"));

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initUser);
  const [authExpires, setAuthExpires] = useState(initExpired);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expireToken", JSON.stringify(authExpires));
    if (
      !!user &&
      new Date(authExpires).getTime() > new Date(Date.now()).getTime()
    ) {
      setIsLogin(true);
    }
  }, [user, authExpires, isLogin]);

  const loginHandler = (innerUser, innerExpires) => {
    setUser(innerUser);
    console.log(innerUser);
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
    setAuthExpires(new Date(Date.now()));
    setIsLogin(false);
    localStorage.clear();
  };

  const contetxtValue = {
    user,
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
