import React, { useEffect, useRef } from "react";
import { loginAppInit as login } from "login/AuthenticationApp";

function ReactComponent(props) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      login(ref.current, { ...props });
    }
  }, []);

  return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
  mfData: JSON.stringify({
    userId: "User ID",
    password: "Password",
    mobileNo: "Mobile No",
    loginCtaLabel: "Login",
    countryCodeValue: "+91",
    loginPopUpTitle: "Login",
    employeeId: "Employee ID",
    showPasswordLabel: "Show",
    hidePasswordLabel: "Hide",
    rememberMe: "Remember Me",
    countryCode: "Country Code",
    staffIdType: ["IGA", "IGE", "AGE"],
    forgotPasswordLabel: "Forgot password?",
    forgetPasswordPath: "/content/skyplus6e/language-masters/en/slt/homepage",
    primaryDescriptionAndRedirection:
      '<p>New User? <a href="/content/skyplus6e/language-masters/en/home/homepage.html">Sign Up</a></p>',
    secondaryDescriptionAndRedirection:
      '<p>New Employee <a href="/content/skyplus6e/language-masters/en/home/homepage.html">Register Now</a></p>',
  }),
  persona: "member",
};

export default ReactComponent;
