import VendorSaleWishList from "~/components/vendorSaleWishlist";
import Navbar from "~/components/navbar";
import { useState } from "react";
import { Form } from "@remix-run/react";
import DeleteWishListedItems from "~/components/deleteWishListedItems";
import CreateWishListedItems from "~/components/createWishListedItems";
import WishListedItems from "~/components/wishListedItems";
import EditWishListedItem from "~/components/editWishListedItem";
import { type wishlistData } from "~/utils/types";
export default function VendorWishlistPage(data: wishlistData) {
  const vendorSales = data.vendorData.data;
  const usersWishListedSales = data.vendorData.data;
  const userData = data.value;
  const [showComponentState, setComponentState] = useState<string | null>(null);
  const [wishlistedItemEditState, setWishlistedEditItemState] = useState<object | null>(null);
  const [selectedItemForDeletionState, setSelectedItemForDeletion] = useState<object | null>(null);
  /*  console.log(data); */

  switch (showComponentState) {
    case "create-wishlisted-items":
      return (
        <main>
          <Navbar {...userData!}></Navbar>
          <CreateWishListedItems {...userData!} {...vendorSales}></CreateWishListedItems>
        </main>
      );
    case "edit-wishlisted-item":
      return (
        <main>
          <Navbar {...userData!}></Navbar>
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
          <div className="delete-container ">
            <div className="delete-form-button-message-container">
              <div>Are you sure you want to delete this item?</div>
              <div className="delete-form-button-container">
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
            </div>
          </div>
          <Navbar {...userData!}></Navbar>
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
          <Navbar {...userData!}></Navbar>
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
