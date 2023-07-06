import http from "k6/http";
import { check } from "k6";
import { getHeader } from "../commons/login.js";
import configs from "../commons/env.js";

export function createWorkspace(header, body) {
  console.log("Header:::" + JSON.stringify(header));
  const res = http.post(`${configs.DOMAIN_BFF}/user-management/workspaces`, JSON.stringify(body), header)
  return res
}
