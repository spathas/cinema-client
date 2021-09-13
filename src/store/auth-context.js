import { createContext, useState } from "react";

const AuthContext = createContext({
  user: {},
  authExpires: new Date(Date.now()),
  isLogin: false,
  login: (user, authExpires) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [authExpires, setAuthExpires] = useState(new Date(Date.now()));
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = (innerUser, innerExpires) => {
    setUser(innerUser);
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
