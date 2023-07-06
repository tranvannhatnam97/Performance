import { sleep } from "k6";
import { ParamElement, parseHTML } from "k6/html";
import http from "k6/http";
import file from 'k6/x/file';
export const options = {
  iterations: 1,
};
const filepath = 'sample-output.html';

export default function () {
    let  response = http.get("https://test-org.ichiba.net");
    // console.log("Location:", parseHTML(response.header).text);
    // console.log("Location:", response['returnUrl']);
    
    file.writeString(filepath, response.headers);
    // console.log(parseHTML(response.headers));
}