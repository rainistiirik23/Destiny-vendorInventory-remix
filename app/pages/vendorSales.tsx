import CurrentVendorInventory from "~/components/currentVendorInventory";
import Navbar from "~/components/navbar";
import { type currentVendorSalesLoaderData } from "~/utils/types";

/* type vendorData = {
  currentVendorSales: Array<object>;
  allVendorSales: Array<object>;
}; */

export default function CurrentVendorInventoryPage(data: currentVendorSalesLoaderData) {
  console.log(data);
  const userData: userData = data.value;
  return (
    <>
      <header>
        <Navbar userData={userData}></Navbar>
      </header>
      <main>
        <CurrentVendorInventory {...data}></CurrentVendorInventory>
      </main>
    </>
  );
}
