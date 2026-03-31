import { masterworkObjectArray, perkObject, type userWishListItem, wishListedVendorSalesProps } from "~/utils/types";
export default function WishListedItems(data: wishListedVendorSalesProps) {
  const {
    usersWishListedSales,
    setWishListedItemsComponentState,
    setWishlistedItemEditStateFunction,
    setSelectedItemForDeletionFunction,
  } = data;

  /* console.log(data); */
  if (!usersWishListedSales) {
    return <div>Log in to create your wishlist</div>;
  }
  return (
    <div>
      <ul className="user-wishlisted-items-unordered-list">
        {usersWishListedSales.map((userWishListItem: userWishListItem, itemIndex: number) => {
          const itemPerks: perkObject = JSON.parse(userWishListItem.perks as string);
          const itemMasterworks: masterworkObjectArray = JSON.parse(userWishListItem.masterworks as string);
          return (
            <li key={`item${itemIndex}`}>
              <div className="user-item-info-container">
                <div className="item-info-container">
                  <img className="user-item-icon" src={`http://www.bungie.net${userWishListItem.item_icon}`} alt="" />
                  <h1 className="user-item-header">{userWishListItem.item_name}</h1>
                </div>
                <h2 className="user-wishlisted-perks-header">Perks</h2>
                <ul className="user-item-perks-masterworks-info-container">
                  {Object.keys(itemPerks).map((perkColumnKey, perkColumnIndex) => {
                    return (
                      <li
                        className="user-perks-unordered-list-item"
                        key={`item${itemIndex}-perkColumn${perkColumnKey}`}
                      >
                        {/*    <h2 className="perk-column-header">{`Perk column ${perkColumnIndex + 1}`}</h2> */}
                        {/*  <ul className="user-perks-unordered-list"> */}
                        {itemPerks[perkColumnKey].map((perk, perkIndex: number) => {
                          return (
                            <div key={`item${itemIndex}-perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                              <img
                                className="user-wishlisted-perk-icon"
                                src={`http://www.bungie.net${perk.perkIcon}`}
                                alt=""
                              />
                              {/* <div className="user-perk-description-container">
                                <span className="user-perk-name">{perk.perkName}</span>
                                  <p>{perk.perkDescription}</p> 
                              </div> */}
                            </div>
                          );
                        })}
                        {/*  </ul> */}
                      </li>
                    );
                  })}
                </ul>
                <ul className="user-item-masterworks-info-container">
                  {itemMasterworks.map((masterwork, masterworkIndex: number) => {
                    return (
                      <li
                        className="user-item-masterworks-info-list-item"
                        key={`item${itemIndex}-masterwork-${masterworkIndex}`}
                      >
                        <h2 className="user-item-masterworks-header">Masterworks</h2>
                        <div className="user-item-masterworks-info-list-item-container">
                          <img
                            className="user-item-masterwork-icon"
                            src={`http://www.bungie.net${masterwork.masterWorkIcon}`}
                            alt=""
                          />
                          <span className="user-item-masterwork-name">{masterwork.masterWorkName}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="edit-delete-wishlisted-item-buttons-container">
                <button
                  className="edit-wishlisted-item-button"
                  onClick={() => {
                    console.log(userWishListItem);
                    setWishlistedItemEditStateFunction(userWishListItem);
                    setWishListedItemsComponentState("edit-wishlisted-item");
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-wishlisted-item-button"
                  onClick={() => {
                    setWishListedItemsComponentState("delete-wishlisted-item");
                    setSelectedItemForDeletionFunction(userWishListItem);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="wishlist-an-item-button-container">
        <button
          className="wishlist-an-item-button"
          onClick={() => {
            setWishListedItemsComponentState("create-wishlisted-items");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
