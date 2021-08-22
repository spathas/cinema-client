import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  tokenExpiration: "",
  isLogin: false,
  login: (token, tokenExpiration) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  let isLogin = false;
  if (!!token && !!tokenExpiration) {
    if (Date.parse(tokenExpiration) > new Date(new Date().getTime())) {
      isLogin = true;
    }
  }

  const loginHandler = (token, tokenExpiration) => {
    setToken(token);
    setTokenExpiration(tokenExpiration);
  };

  const logoutHandler = () => {
    setToken(null);
    setTokenExpiration(null);
  };

  const contetxtValue = {
    token,
    tokenExpiration,
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
