import CurrentVendorInventory from "~/components/currentVendorInventory";
import Navbar from "~/components/navbar";
import { type loaderData } from "~/utils/types";
import { type currentVendorSalesLoaderData } from "~/utils/types";

/* type vendorData = {
  currentVendorSales: Array<object>;
  allVendorSales: Array<object>;
}; */

export default function CurrentVendorInventoryPage(data: currentVendorSalesLoaderData) {
  console.log(data);

  return (
    <>
      <header>
        <Navbar userData={data.value}></Navbar>
      </header>
      <main>
        <CurrentVendorInventory {...data}></CurrentVendorInventory>
      </main>
    </>
  );
}
