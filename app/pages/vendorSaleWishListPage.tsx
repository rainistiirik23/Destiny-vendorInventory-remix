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
      ensureValueIsNotNullOrUndefined(userData);
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <CreateWishListedItems
            userData={userData as requiredUserData}
            vendorData={vendorSales}
          ></CreateWishListedItems>
        </main>
      );
    case "edit-wishlisted-item":
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <EditWishListedItem
            wishListedItemEditInfo={wishlistedItemEditState as wishListedItemEditInfoType}
            allVendorSales={data.vendorData.allVendorSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
            setWishListedItemsComponentState={setComponentState}
          ></EditWishListedItem>
        </main>
      );
    case "delete-wishlisted-item":
      return (
        <main>
          <DeleteWishListedItems
            setWishListedItemsComponentState={setComponentState}
            setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
            selectedItemForDeletion={selectedItemForDeletionState}
          ></DeleteWishListedItems>
          <Navbar userData={userData}></Navbar>
          <WishListedItems
            setWishListedItemsComponentState={setComponentState}
            usersWishListedSales={usersWishListedSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
            setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
          ></WishListedItems>
        </main>
      );

    default:
      return (
        <main>
          <Navbar userData={userData}></Navbar>
          <WishListedItems
            setWishListedItemsComponentState={setComponentState}
            usersWishListedSales={usersWishListedSales}
            setWishlistedItemEditStateFunction={setWishlistedEditItemState}
            setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
          ></WishListedItems>
        </main>
      );
  }
}
