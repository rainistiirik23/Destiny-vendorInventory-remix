import { type loaderData } from "~/utils/types";
import VendorSaleWishList from "~/components/vendorSaleWishlist";
import Navbar from "~/components/navbar";
export default function VendorWishlistPage(data: loaderData) {
  const vendorSales = data.vendorData.data;
  /*   console.log(vendorSales); */
  const userData = data.value;
  return (
    <main>
      <Navbar userData={userData}></Navbar>
      <VendorSaleWishList userData={userData} {...vendorSales}></VendorSaleWishList>
    </main>
  );
}
