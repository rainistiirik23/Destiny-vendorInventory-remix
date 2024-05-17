/* import { DataFunctionArgs } from "@remix-run/node"; */
import { useLoaderData } from "@remix-run/react";
import { loadCurrentVendorSales } from "~/loaders/loadVendorData";
import CurrentVendorInventoryPage from "~/pages/vendorSales";
export async function loader() {
  const vendorData = loadCurrentVendorSales();
  return vendorData;
}

export default function VendorWishlist() {
  const vendorData = useLoaderData<typeof loader>();
  console.log(vendorData);

  return <CurrentVendorInventoryPage {...vendorData}></CurrentVendorInventoryPage>;
}
