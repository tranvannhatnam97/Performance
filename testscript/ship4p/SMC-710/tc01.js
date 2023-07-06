import http from "k6/http";
import { check, sleep } from "k6";
import { getHeader } from "../../../src/commons/login.js";
import { createShipment } from "../../../src/ship4p/create_shipment.js";
export const options = {

    // name of the executor to use
    // vus: 2,
    // duration: "30s"
    // iterations: 1
    // stages: [
    //     { duration: '60', target: 4 },
    //     { duration: '40s', target: 4 },
    //     { duration: '10s', target: 0 },
    //   ],

    scenarios: {
        // constant_request_rate: {
        //     executor: 'constant-arrival-rate',
        //     rate: 20,
        //     timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
        //     //   duration: '30s',
        //     //   preAllocatedVUs: 20, // how large the initial pool of VUs would be
        //     //   maxVUs: 20,
        //     stages: [
        //         { duration: '60', target: 4 },
        //         { duration: '40s', target: 4 },
        //         { duration: '10s', target: 0 },
        //     ]
        // },
        contacts: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
              { duration: '60s', target: 10 },
              { duration: '20s', target: 10 },
            ],
            gracefulRampDown: '0s',
            // rate: 1,
            // timeUnit: '1s',
          },
    },



};
export function setup() {
    const header = getHeader("mongtoria@gmail.com", "Cr@zyloop1");
    return header;
}
export default function (header) {
    // const header = getHeader("mongtoria@gmail.com", "Cr@zyloop1")
    const body = {
        "CourierId": "VNPOST",
        "CourierAccountId": "0529d720-6d7e-48cc-9131-d347149320e9",
        "RefNumber": "12321321321321",
        "ShipmentNumber": null,
        "Tax": 0.0,
        "Currency": "VN",
        "CubitUnit": null,
        "WeightUnit": null,
        "Note": "string",
        "Cod": null,
        "ShippingServiceId": "5e4a1bd3-ad94-425e-8731-b1c819eb76a5",
        "SentDate": "2023-03-29T15:25:03.9826652Z",
        "PickDate": "2023-03-29T15:25:03.9827081Z",
        "AdditionalInfo": "{\"CheckShipment\":true,\"Picture\":true}",
        "ConsigneeAddress": {
            "Id": null,
            "Name": "Hoang",
            "PhoneNumber": "0123456789",
            "Email": null,
            "CountryId": "d682a645-5129-4eae-ab36-b10113337a42",
            "CountryName": "HN",
            "CityId": "92556611-6c80-22b1-7eec-30202f042306",
            "CityName": "Khanh Hoa",
            "DistrictId": "985f79e2-bd7d-ce4b-b339-50c6fe17e564",
            "DistrictName": "Thành phố Nha Trang",
            "WardId": "17ff4b9f-3cc6-3f87-3c18-78b154469b02",
            "WardName": "Phường Vĩnh Hải",
            "PostalCode": null,
            "Address1": "Test thoi",
            "Address2": null,
            "Type": null,
            "AddressCode": null
        },
        "ShipperAddress": {
            "Id": null,
            "Name": "Adam",
            "PhoneNumber": "0375967251",
            "Email": "lequangvinh@gmail.com",
            "CountryId": "string",
            "CountryName": "string",
            "CityId": "e142a1af-abba-15ce-6428-020e1756859e",
            "CityName": "Ha Noi",
            "DistrictId": "bfee8399-2f0d-6a33-321f-5d78201436cd",
            "DistrictName": "Huyện Đông Anh",
            "WardId": "dce09107-9dab-171c-35e2-b42a19bbc3b1",
            "WardName": "Xã Xuân Canh",
            "PostalCode": null,
            "Address1": "Le Quang Dao",
            "Address2": null,
            "Type": null,
            "AddressCode": null
        },
        "ShipmentAddServices": [],
        "ShipmentItems": [
            {
                "Id": null,
                "OrderId": "123",
                "ProductCode": "string",
                "ProductName": "Watch",
                "SKU": "string",
                "HSCode": "string",
                "Origin": "string",
                "UnitPrice": 200.0,
                "Quantity": 0,
                "Total": 0.0,
                "Unit": "string"
            }
        ],
        "ShipmentPackages": [
            {
                "Id": null,
                "ShipmentId": null,
                "BoxTypeId": "522d2699-28af-41ad-a6e1-cd251485769d",
                "NoNumber": "string",
                "Weight": 10,
                "Length": 30,
                "Width": 20,
                "Height": 20,
                "TotalAmount": 100000,
                "Cod": 10000
            },
            {
                "Id": null,
                "ShipmentId": null,
                "BoxTypeId": "4b46b043-e157-4cfa-96ca-722f4fa7d641",
                "NoNumber": "string",
                "Weight": 10,
                "Length": 20,
                "Width": 20,
                "Height": 20,
                "TotalAmount": 100000,
                "Cod": 10000
            }
        ],
        "IsSaveShipperAddress": null,
        "IsSaveConsigneeAddress": null
    }
    var res =  createShipment(header, body)
     check(res, {
        "check status 2": (r) => {
            console.log("Status:::", r.status);
            return r.status === 200;
        },
        "check data 2": (r) => {
            const data = r.json();
            // console.log("Response---" + JSON.stringify(data));
            return data.shipmentNumber.length > 0;
        },
    });
}