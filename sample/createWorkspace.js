import http from "k6/http";
import { check } from "k6";
import { getBffCookie } from "./commons/login.js";
import configs from "./commons/env.js";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<1300"], // 95% of requests should be below 200ms
  },
  // vus: 1,
  // duration: "20s",
  // iterations: 1
  stages: [
            { duration: '60', target: 4 },
            { duration: '40s', target: 4 },
            { duration: '10s', target: 0 },
        ]
};

export function setup() {
  const bff = getBffCookie("mongtoria@gmail.com", "Cr@zyloop1");
  return bff;
}

export default function (bff) {
  // console.log("BFF----" + JSON.stringify(bff));
  var headers = {
    headers:{
      "Content-Type": "application/json"
    },
    cookies: bff
  }
  console.log("Header:::" + JSON.stringify(headers));
  const res1 = http.get(`${configs.DOMAIN_BFF}/user-management/workspaces`, headers);

  check(res1, {
    "check status": (r) => {
      return r.status === 200;
    },
    "check data": (r) => {
      const data = r.json();
      // console.log("Data---" + JSON.stringify(data));
      console.log("Length---" + data.items.length);
      return data.items.length > 0;
    },
  });
  var body = {
    "name":"Kk 18",
    "slug":"kk-19",
    "email":"mongtoria@gmail.com",
    "countryCode":"VN",
    "CurrencyId": "1e9cd79e-0f37-4b2c-bb0c-a6a878f0480c"
  }
  var body_data = JSON.stringify(body)
  console.log("bodydata::::" + body_data);
  const res2 = http.post(`${configs.DOMAIN_BFF}/user-management/workspaces`, body_data, headers)
  check(res2, {
    "check status 2": (r) => {
      console.log("Status::::", r.status);
      return r.status === 200;
    },
    "check data 2": (r) => {
      const data = r.json();
      console.log("Response---" + JSON.stringify(data));
      return data.id.length > 0;
    },
  });
}
