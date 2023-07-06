import http from "k6/http";
import { check, group, sleep } from "k6";
import { getValueFromForm } from "./commons/ultils.js";

// const domainBff = "https://test-api.ichiba.net";
// const domainIdentity = "https://test-id.ichiba.net";
// const domainOrg = "https://test-org.ichiba.net";

const domainBff = "http://localhost:7064";
const domainIdentity = "https://localhost:5000";
const domainOrg = "http://localhost:3000";

// export const options = {
//   thresholds: {
//     http_req_failed: ["rate<0.01"], // http errors should be less than 1%
//     http_req_duration: ["p(95)<400"], // 95% of requests should be below 200ms
//   },
//   vus: 40,
//   duration: "1s",
// };

export default function () {
  group("login", function () {
    let res = http.get(`${domainBff}/account/login?redirectUrl=${domainOrg}`);

    let checkRes = check(res, {
      "Unauthorized -> redirect to login page": (r) =>
        r.body.indexOf("pnl_language") !== -1,
    });

    const vars = {};
    const email = "khanhnd@ichiba.vn";

    vars["ReturnUrl"] = getValueFromForm(res, "ReturnUrl");
    vars["PrefixPhoneNumber"] = getValueFromForm(res, "PrefixPhoneNumber");
    vars["CountryCode"] = "VN";
    vars["IsLoginEmail"] = getValueFromForm(res, "IsLoginEmail");
    vars["Email"] = email;
    vars["Password"] = "123456aA@";
    vars["__RequestVerificationToken"] = getValueFromForm(
      res,
      "__RequestVerificationToken"
    );

    sleep(1);
    res = http.post(`${domainIdentity}/Connect/Login`, vars);
    sleep(1);
    checkRes = check(res, {
      "is logged in, redirect to org application": (r) => {
        return r.url.toString().indexOf(domainOrg) !== -1;
      },
    });

    const vuJar = http.cookieJar();
    const cookiesForURL = vuJar.cookiesForURL(`${domainBff}/userinfo`);
    check(cookiesForURL, {
      "cookie contain _BFF": (r) => {
        return !!r.__BFF;
      },
    });
  });
}
