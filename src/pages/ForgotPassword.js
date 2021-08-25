import { useState } from "react";
import { Container } from "@material-ui/core";

//Components
import SendTokenToEmail from "../components/authForms/SendTokenToEmail";
import SetNewPassword from "../components/authForms/SetNewPassword";

export default function ForgotPassword() {
  const [token, setToken] = useState("");

  const tokenHandler = (innerToken) => {
    setToken(innerToken);
  };

  return (
    <Container maxWidth="sm">
      {!token && <SendTokenToEmail takeToken={tokenHandler} />}
      {!!token && <SetNewPassword token={token} />}
    </Container>
  );
}
