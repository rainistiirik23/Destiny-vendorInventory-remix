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
export async function getCurrentVendorSales() {
  const request = await axios.get("https://localhost:8000/api/currentVendorSales", {
    httpsAgent: new nodehttps.Agent({ rejectUnauthorized: false }),
  });

  return request.data;
}
export async function getAllVendorSales() {
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
export async function getVendorSalesWithUsersWishListedSales(userId:unknown){
    const request = await axios.post('https://localhost:8000/api/getUsersWishListedSales' ,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'},data:{userId:userId}})
    return request.data
}
export async function editWishListedItem(wishlistedItem:object){
    const request = await axios.put('https://localhost:8000/api/editWishListedItem' ,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'},data:wishlistedItem,})
    return request.data
}
export async function deleteWishListedItem(wishlistedItem:object){
    const request = await axios.delete('https://localhost:8000/api/deleteWishlistedItem' ,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'},data:wishlistedItem,})
    return request.data
}
