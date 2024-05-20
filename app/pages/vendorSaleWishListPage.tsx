import { type loaderData } from "~/utils/types";
import VendorSaleWishList from "~/components/vendorSaleWishlist";
import Navbar from "~/components/navbar";
import { useState } from "react";
import { Form } from "@remix-run/react";
import DeleteWishListedItems from "~/components/deleteWishListedItems";
import CreateWishListedItems from "~/components/createWishListedItems";
import WishListedItems from "~/components/wishListedItems";
import EditWishListedItem from "~/components/editWishListedItem";
export default function VendorWishlistPage(data: loaderData) {
  const vendorSales = data.vendorData.data;
  const usersWishListedSales = data.vendorData.data;
  const userData = data.value;
  const [showComponentState, setComponentState] = useState<string | null>(null);
  const [wishlistedItemEditState, setWishlistedEditItemState] = useState<object | null>(null);
  const [selectedItemForDeletionState, setSelectedItemForDeletion] = useState<object | null>(null);
  console.log(selectedItemForDeletionState);

  switch (showComponentState) {
    case "create-wishlisted-items":
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <CreateWishListedItems userData={userData} {...vendorSales}></CreateWishListedItems>
        </main>
      );
    case "edit-wishlisted-item":
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <EditWishListedItem
            wishListedItemEditInfo={wishlistedItemEditState}
            allVendorSales={data.vendorData.data.vendorData.allVendorSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
            setComponentStateFunction={setComponentState}
          ></EditWishListedItem>
        </main>
      );
    case "delete-wishlisted-item":
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <div>
            <button
              onClick={() => {
                setComponentState(null);
                setSelectedItemForDeletion(null);
              }}
            >
              Cancel
            </button>
            <Form
              method="DELETE"
              onSubmit={() => {
                setComponentState(null);
                setSelectedItemForDeletion(null);
              }}
            >
              <input name="data" value={JSON.stringify(selectedItemForDeletionState)} type="hidden" />
              <input type="submit"></input>
            </Form>
          </div>
          <WishListedItems
            setWishListedItemsComponentState={setComponentState}
            {...usersWishListedSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
          ></WishListedItems>
        </main>
      );

    default:
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <WishListedItems
            setWishListedItemsComponentState={setComponentState}
            {...usersWishListedSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
            setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
          ></WishListedItems>
          {/*  <VendorSaleWishList userData={userData} {...vendorSales}></VendorSaleWishList> */}
        </main>
      );
  }
}
