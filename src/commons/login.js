import http from "k6/http";
import { getValueFromForm } from "./ultils.js";
import configs from "./env.js";
import { sleep } from "k6";

export function getHeader(email, password) {
  let res =  http.get(
    `${configs.DOMAIN_BFF}/account/login?redirectUrl=${configs.DOMAIN_ORG}`
  );

  const vars = {};

  vars["ReturnUrl"] =  getValueFromForm(res, "ReturnUrl");
  vars["PrefixPhoneNumber"] =  getValueFromForm(res, "PrefixPhoneNumber");
  vars["CountryCode"] = "VN";
  vars["IsLoginEmail"] =  getValueFromForm(res, "IsLoginEmail");
  vars["Email"] = email;
  vars["Password"] = password;
  vars["__RequestVerificationToken"] =  getValueFromForm(
    res,
    "__RequestVerificationToken"
  );
  res =  http.post(`${configs.DOMAIN_IDENTITY}/Connect/Login`, vars);

  const vuJar =  http.cookieJar();
  const cookiesForURL =  vuJar.cookiesForURL(`${configs.DOMAIN_BFF}/userinfo`);
   sleep(1)
  // console.log("cookies-----", JSON.stringify(cookiesForURL));
  var bff = {
    __BFF: cookiesForURL.__BFF[0],
    expires_in: cookiesForURL.expires_in[0]
  };
  return {
    headers: {
      "Content-Type": "application/json"
    },
    cookies: bff
  }
}
