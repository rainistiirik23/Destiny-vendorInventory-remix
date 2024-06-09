import {
  masterworkObjectArray,
  perkObject,
  type userWishListItem,
  type usersWishlistedItemsFunctions,
} from "~/utils/types";
export default function WishListedItems(data: usersWishlistedItemsFunctions) {
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
      <ul>
        {usersWishListedSales.map((userWishListItem: userWishListItem, itemIndex: number) => {
          const itemPerks: perkObject = JSON.parse(userWishListItem.perks as string);
          const itemMasterworks: masterworkObjectArray = JSON.parse(userWishListItem.masterworks as string);
          return (
            <div key={`item${itemIndex}`}>
              <li className="user-item-info-container">
                <img src={`http://www.bungie.net${userWishListItem.item_icon}`} alt="" />
                <h1>{userWishListItem.item_name}</h1>
                <ul className="user-item-perks-masterworks-info-container">
                  {Object.keys(itemPerks).map((perkColumnKey, perkColumnIndex) => {
                    return (
                      <li key={`item${itemIndex}-perkColumn${perkColumnKey}`}>
                        <h2>{`Perk column ${perkColumnIndex + 1}`}</h2>
                        <ul className="perks-unordered-list">
                          {itemPerks[perkColumnKey].map((perk, perkIndex: number) => {
                            return (
                              <li key={`item${itemIndex}-perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                                <img
                                  style={{ backgroundColor: "blue" }}
                                  src={`http://www.bungie.net${perk.perkIcon}`}
                                  alt=""
                                />
                                <span>{perk.perkName}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
                <ul className="user-item-masterworks-info-container">
                  {itemMasterworks.map((masterwork, masterworkIndex: number) => {
                    return (
                      <li key={`item${itemIndex}-masterwork-${masterworkIndex}`}>
                        <img src={`http://www.bungie.net${masterwork.masterWorkIcon}`} alt="" />
                        <span>{masterwork.masterWorkName}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <button
                onClick={() => {
                  console.log(userWishListItem);
                  setWishlistedItemEditStateFunction(userWishListItem);
                  setWishListedItemsComponentState("edit-wishlisted-item");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setWishListedItemsComponentState("delete-wishlisted-item");
                  setSelectedItemForDeletionFunction(userWishListItem);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </ul>
      <button
        onClick={() => {
          setWishListedItemsComponentState("create-wishlisted-items");
        }}
      >
        Add
      </button>
    </div>
  );
}
