import Navbar from "~/components/navbar";
import { useState } from "react";
import CreateWishListedItems from "~/components/createWishListedItems";
import WishListedItems from "~/components/wishListedItems";
import EditWishListedItem from "~/components/editWishListedItem";
import DeleteWishListedItems from "~/components/deleteWishListedItems";
import {
  requiredUserData,
  wishlistUserData,
  type userWishListItem,
  type wishListedItemEditInfoType,
} from "~/utils/types";
import { ensureValueIsNotNullOrUndefined } from "~/utils/helpers";
export default function VendorWishlistPage(data: wishlistUserData) {
  const vendorSales = data.vendorData;
  const usersWishListedSales = data.usersWishListedSales;
  const userData = data.userData;
  const [showComponentState, setComponentState] = useState<string | null>(null);
  const [wishlistedItemEditState, setWishlistedEditItemState] = useState<wishListedItemEditInfoType | null>(null);
  const [selectedItemForDeletionState, setSelectedItemForDeletion] = useState<userWishListItem | null>(null);

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
