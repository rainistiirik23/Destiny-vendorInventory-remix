/* import { DataFunctionArgs } from "@remix-run/node"; */
import { useLoaderData } from "@remix-run/react";
import { loadVendorData } from "~/loaders/loadVendorData";
import CurrentVendorInventoryPage from "~/pages/vendorSales";
export async function loader() {
  const vendorData = loadVendorData();
  return vendorData;
}

export default function VendorWishlist() {
  const vendorData = useLoaderData<typeof loader>();

  return <CurrentVendorInventoryPage {...vendorData}></CurrentVendorInventoryPage>;
}
