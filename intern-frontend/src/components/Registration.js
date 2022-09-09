import React from "react";
import FormRegistration from "../components/Form/FormRegistration";

import NavbarUser from "./widget/Navbar";


function Registration() {
  return (
    <>
      <NavbarUser showLogout={false} showLogin={true}/>
      <FormRegistration/>
    </>
  );
}

export default Registration;
