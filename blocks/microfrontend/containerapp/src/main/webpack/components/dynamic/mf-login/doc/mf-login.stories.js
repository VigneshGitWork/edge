import React from "react";
import Login from "../mf-login.hbs";

export default {
  argTypes: {},
  component: Login,
  title: "Components/React/Login",
  args: {
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
      baseApiUrlOld: "https://comm-uat.goindigo.in",
      subBaseApiUrlOld: "/IndiGo-Dev2",
      memberLoginOld: "/Member/LoginAEM",
      agentLoginOld: "/Agent/LoginAEM",
      capfLoginOld: "/CAPF/LoginAEM",
      memberLogoutOld: "/Member/Logout",
      agentLogoutOld: "/Agent/Logout",
      subDomain: ".goindigo.in",  
    }),
  },
};

const Template = (args) => <Login {...args} />;

export const Member = Template.bind({});
Member.dataset = {
  persona: "member",
};
