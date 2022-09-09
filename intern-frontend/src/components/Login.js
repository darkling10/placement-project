import React from "react";
import FormLogin from "./Form/FormLogin";

import NavbarUser from "./widget/Navbar";

function Login() {
  return (
    <>
      <NavbarUser showLogout={false} showLogin={false} />
      <FormLogin />
    </>
  );
}

export default Login;
