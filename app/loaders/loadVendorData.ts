import { getCurrentAndAllVendorSales, getDiscordAccountId } from "~/utils/requests";

export async function loadVendorData() {
    const vendorData = await getCurrentAndAllVendorSales()
    return {data:{vendorData}}
}
export async function loadVendorDataWithDiscordId(code:string) {
    const vendorData = await getCurrentAndAllVendorSales();
    const discordAccountId = await getDiscordAccountId(code);
    return {data:{vendorData,discordAccountId}}
}
