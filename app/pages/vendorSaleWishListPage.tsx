import Navbar from "~/components/navbar";
import { useState, useEffect } from "react";
import CreateWishListedItems from "~/components/createWishListedItems";
import WishListedItems from "~/components/wishListedItems";
import EditWishListedItem from "~/components/editWishListedItem";
import DeleteWishListedItems from "~/components/deleteWishListedItems";
import BurgerMenu from "~/components/burger-menu";
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
  const [burgerMenuState, setBurgermenuState] = useState<Boolean>(false);
  const [selectedItemPerkState, setSelectedItemPerkState] = useState<selectedPerkWithState>(null);
  const [selectedItemMasterWorkState, setSelectedItemMasterWorkState] = useState<masterWork | null>(null);
  useEffect(() => {
    if (burgerMenuState) {
      document.body.classList.add("body-disable-scroll");
    } else if (burgerMenuState) {
      document.body.classList.remove("body-disable-scroll");
    }
  });
  switch (showComponentState) {
    case "create-wishlisted-items":
      ensureValueIsNotNullOrUndefined(userData);
      if (burgerMenuState) {
        return (
          <>
            <div className="wishlisted-vendor-sales-blur-container">
              <header>
                <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
              </header>
              <main>
                <CreateWishListedItems
                  userData={userData as requiredUserData}
                  vendorData={vendorSales}
                  setWishListedItemsComponentState={setComponentState}
                ></CreateWishListedItems>
              </main>
            </div>
            <BurgerMenu setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></BurgerMenu>
          </>
        );
      }
      return (
        <>
          <header>
            <Navbar userData={userData} setBurgerMenuStateFunction={setBurgermenuState}></Navbar>
          </header>
          <main>
            <CreateWishListedItems
              userData={userData as requiredUserData}
              vendorData={vendorSales}
              setWishListedItemsComponentState={setComponentState}
            ></CreateWishListedItems>
          </main>
        </>
      );
    case "edit-wishlisted-item":
      if (burgerMenuState) {
        return (
          <>
            <div className="wishlisted-vendor-sales-blur-container">
              <header>
                <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
              </header>
              <main>
                <EditWishListedItem
                  wishListedItemEditInfo={wishlistedItemEditState as wishListedItemEditInfoType}
                  allVendorSales={data.vendorData.allVendorSales}
                  setWishlistedItemEditStateFunction={setWishlistedEditItemState}
                  setWishListedItemsComponentState={setComponentState}
                ></EditWishListedItem>
              </main>
            </div>
            <BurgerMenu setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></BurgerMenu>
          </>
        );
      }
      return (
        <>
          <header>
            <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
          </header>
          <main>
            <EditWishListedItem
              wishListedItemEditInfo={wishlistedItemEditState as wishListedItemEditInfoType}
              allVendorSales={data.vendorData.allVendorSales}
              setWishlistedItemEditStateFunction={setWishlistedEditItemState}
              setWishListedItemsComponentState={setComponentState}
            ></EditWishListedItem>
          </main>
        </>
      );
    case "delete-wishlisted-item":
      if (burgerMenuState) {
        return (
          <>
            <div className="wishlisted-vendor-sales-blur-container">
              <header>
                <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
              </header>
              <main>
                <DeleteWishListedItems
                  setWishListedItemsComponentState={setComponentState}
                  setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
                  selectedItemForDeletion={selectedItemForDeletionState}
                ></DeleteWishListedItems>
                <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
                <WishListedItems
                  setWishListedItemsComponentState={setComponentState}
                  usersWishListedSales={usersWishListedSales}
                  setWishlistedItemEditStateFunction={setWishlistedEditItemState}
                  setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
                ></WishListedItems>
              </main>
            </div>
            <BurgerMenu setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></BurgerMenu>
          </>
        );
      }
      return (
        <>
          <header>
            <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
          </header>
          <main>
            <DeleteWishListedItems
              setWishListedItemsComponentState={setComponentState}
              setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
              selectedItemForDeletion={selectedItemForDeletionState}
            ></DeleteWishListedItems>
            <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
            <WishListedItems
              setWishListedItemsComponentState={setComponentState}
              usersWishListedSales={usersWishListedSales}
              setWishlistedItemEditStateFunction={setWishlistedEditItemState}
              setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
            ></WishListedItems>
          </main>
        </>
      );

    default:
      if (burgerMenuState) {
        return (
          <>
            <div className="wishlisted-vendor-sales-blur-container">
              <header>
                <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
              </header>
              <main>
                <WishListedItems
                  setWishListedItemsComponentState={setComponentState}
                  usersWishListedSales={usersWishListedSales}
                  setWishlistedItemEditStateFunction={setWishlistedEditItemState}
                  setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
                ></WishListedItems>
              </main>
            </div>
            <BurgerMenu setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></BurgerMenu>
          </>
        );
      }
      return (
        <>
          <header>
            <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
          </header>
          <main>
            <WishListedItems
              setWishListedItemsComponentState={setComponentState}
              usersWishListedSales={usersWishListedSales}
              setWishlistedItemEditStateFunction={setWishlistedEditItemState}
              setSelectedItemForDeletionFunction={setSelectedItemForDeletion}
            ></WishListedItems>
          </main>
        </>
      );
  }
}
