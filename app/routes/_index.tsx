import styles from "~/styles/entry.css?url";
/* import { DataFunctionArgs } from "@remix-run/node"; */
import { useLoaderData } from "@remix-run/react";
import { loadCurrentVendorSales } from "~/loaders/loadVendorData";
import CurrentVendorInventoryPage from "~/pages/vendorSales";
export async function loader() {
  const vendorData = loadCurrentVendorSales();
  return vendorData;
}
export function LinksFunction() {
  return [{ rel: "stylesheet", href: styles }];
}
export default function VendorWishlist() {
  const vendorData = useLoaderData<typeof loader>();
  /*   console.log(vendorData); */

  return <CurrentVendorInventoryPage {...vendorData}></CurrentVendorInventoryPage>;
}
