import CurrentVendorInventory from "~/components/currentVendorInventory";
import { type currentVendorSalesLoaderData } from "~/utils/types";

/* type vendorData = {
  currentVendorSales: Array<object>;
  allVendorSales: Array<object>;
}; */

export default function CurrentVendorInventoryPage(data: currentVendorSalesLoaderData) {
  console.log(data);

  return (
    <main>
      <CurrentVendorInventory {...data}></CurrentVendorInventory>
    </main>
  );
}
