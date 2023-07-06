import { check, sleep } from "k6";
import { feeder } from "./data_feeder.js";
import http from "k6/http";
export const options = {
    scenarios: {
        example_scenario: {
            // name of the executor to use
            executor: 'shared-iterations',

            // startTime: '10s',
            gracefulStop: '5s',
            tags: { example_tag: 'testing' },

            // executor-specific configuration
            vus: 5,
            iterations: 10,
            maxDuration: '30s',
        }
    },
};
export function setup() {
    console.log("Setup");
}
export default function () {
    console.log("Vus-Iter:" + __VU + "-" + __ITER + " Season:" + feeder())
    var res = http.get("http://localhost:3111/user")
    sleep(2)
    check(res, {
        'is status 200': (r) => r.status === 200,
    })
}