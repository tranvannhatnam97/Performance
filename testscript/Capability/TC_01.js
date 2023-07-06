import http from "k6/http";
import { check, sleep } from "k6";
import { getHeader } from "../../src/commons/login.js";
import { createWorkspace } from "../../src/Capability/create_workspace.js";

export const options = {

    // name of the executor to use
    // scenarios: {

    //     per_vu_scenario: {
    //         executor: "per-vu-iterations",
    //         vus: 10,
    //         iterations: 20,
    //     },


    //     contacts: {
    //         executor: 'ramping-vus',
    //         startVUs: 0,
    //         stages: [
    //             { duration: '60s', target: 10 },
    //             { duration: '20s', target: 10 },
    //         ],
    //         // gracefulRampDown: '0s',
    //         // rate: 1,
    //         // timeUnit: '1s',
    //     },
    // },
    iterations: 1,

};
export function setup() {
    const header = getHeader("mongtoria@gmail.com", "Cr@zyloop1");
    return header;
}
export default function (header) {
    // const header = getHeader("mongtoria@gmail.com", "Cr@zyloop1");
    // const header = getHeader("mongtoria@gmail.com", "Cr@zyloop1")
    const name = "Per27 " + __VU.toString() + " " + __ITER.toString()
    const slug = "per27-" + __VU.toString() + "-" + __ITER.toString()
    console.log("name:::" + name);
    console.log("slug:::" + slug);
    const body = {
        "name": null,
        "slug": null,
        "email": "mongtoria@gmail.com",
        "countryCode": "VN",
        "CurrencyId": "1e9cd79e-0f37-4b2c-bb0c-a6a878f0480c"
    }
    body["name"] = name
    body["slug"] = slug
    var res = createWorkspace(header, body)
    check(res, {
        "check status 2": (r) => {
            console.log("Status::::", r.status);
            return r.status === 200;
        },
        "check data 2": (r) => {
            const data = r.json();
            // console.log("Response---" + JSON.stringify(data));
            return data.id.length !== 0;
        },
    });
    sleep(1)
}