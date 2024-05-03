import CurrentVendorInventory from "~/components/currentVendorInventory";
import { type loaderData } from "~/utils/types";

/* type vendorData = {
  currentVendorSales: Array<object>;
  allVendorSales: Array<object>;
}; */

export default function CurrentVendorInventoryPage(data: loaderData) {
  return (
    <main>
      <CurrentVendorInventory {...data}></CurrentVendorInventory>
    </main>
  );
}
