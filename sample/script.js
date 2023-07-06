import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 200ms
  },
  vus: 200,
  duration: "2s",
};

const url = "https://test-mobile-api.ichiba.net/connect/token";
// const url = "http://localhost:8064/connect/token";

export default function () {
  const payload = {
    grant_type: "password",
    username: "khanhnd@ichiba.vn",
    password: "123456aA@",
    client_secret: "aHR0cHM6Ly9pY2hpYmEudm4=",
    // client_id: "ed1c0e56-d90e-4b31-8df9-f001fe3d869f",
    // client_id: "78caa1cc-8031-4e22-bd7e-88a35ef5fc29",
    client_id: "31ef3380-39f3-4a73-987a-44a34f079527",
  };

  const params = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = http.post(url, payload, params);
  check(response, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
  return response;
}
