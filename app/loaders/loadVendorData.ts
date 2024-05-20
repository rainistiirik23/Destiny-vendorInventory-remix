import { getCurrentVendorSales, getDiscordAccountId,getAllVendorSales,getVendorSalesWithUsersWishListedSales } from "~/utils/requests";

export async function loadCurrentVendorSales() {
    const vendorData = await getCurrentVendorSales()
    return {data:{vendorData}}
}
export async function loadVendorDataWithDiscordId(code:string) {
    const vendorData = await getAllVendorSales();
    const discordAccountId = await getDiscordAccountId(code);
    return {data:{vendorData,discordAccountId}}
}
export async function loadAllVendorSales(){
const vendorData = await getAllVendorSales();
 return {data:{vendorData}}
}
export async function loadAllVendorSalesWithUsersWishListedSales(userID:unknown){
const usersWishListedSales = await getVendorSalesWithUsersWishListedSales(userID);
const vendorData = await getAllVendorSales();
return{data:{vendorData,usersWishListedSales}}
}
