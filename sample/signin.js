import { parseHTML } from "k6/html";
import http from "k6/http";
import { chromium } from "k6/experimental/browser";
import { sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 200ms
  },
  vus: 4,
  duration: "15s",
};

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();
  try {
    http.get(
      "https://test-api.ichiba.net/account/login?redirectUrl=http%3A%2F%2Flocalhost%3A3000"
    );

    await page.goto(
      "https://test-api.ichiba.net/account/login?redirectUrl=http%3A%2F%2Flocalhost%3A3000"
    );
    await Promise.all([page.waitForNavigation()]);

    page.locator('input[name="Email"]').type("khanhnd@ichiba.vn");
    page.locator('input[name="Password"]').type("123456aA@");
    page.screenshot({ path: "screenshot.png" });
    const submitButton = page.locator('button[type="submit"]');

    await Promise.all([submitButton.click()]);
    sleep(2);

    // const resBackToOrg = page.waitForSelector();

    await Promise.all([page.waitForNavigation()]);
    page.screenshot({ path: "screenshot3.png" });
    // sleep(10);

    // check(page, {
    //   header: page.locator("h2").textContent() == "Welcome, admin!",
    // });
  } finally {
    page.close();
    browser.close();
  }
}
