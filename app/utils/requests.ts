import axios from "axios";
 import https from "https";
import nodehttps from "node:https";

/* import { request } from "https" */
/* const agent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
 });
 */
export async function getCurrentAndAllVendorSales() {
  const request = await axios.get("https://localhost:8000/api/allVendorSales", {
    httpsAgent: new nodehttps.Agent({ rejectUnauthorized: false }),
  });

  return request.data;
}
export async function getDiscordAccountId(authCode: string) {
const request = await axios.post('https://localhost:8000/api/getUserId' ,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'},data:{code:authCode},httpsAgent: new nodehttps.Agent({rejectUnauthorized:false})})
  return request.data;
}
export async function saveWishListedItem(itemData,userData){
    const request = await axios.post('https://localhost:8000/api/saveWishListedItem' ,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'},data:{itemData:itemData,userData:userData}})
    return request.data
}
