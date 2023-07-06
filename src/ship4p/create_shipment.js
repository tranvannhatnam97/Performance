import http from "k6/http";
import { check } from "k6";
import { getHeader } from "../commons/login.js";
import configs from "../commons/env.js";

export function createShipment(header, body) {
  console.log("Header:::" + JSON.stringify(header));
  const res =  http.post(`https://admin-api-test.ship4p.com/ship4p/ws1/v1/shipments`, JSON.stringify(body), header)
 
  try {
     console.log("Response---" +  JSON.stringify(res.json()));
  } catch (error) {
    console.error("Error:::" + error);
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }
  return res

}
