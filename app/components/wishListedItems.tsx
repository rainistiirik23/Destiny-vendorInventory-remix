export default function WishListedItems(data: unknown) {
  const {
    usersWishListedSales,
    setWishListedItemsComponentState,
    setWishlistedItemEditStateFunction,
    setSelectedItemForDeletionFunction,
  } = data;

  /* console.log(usersWishListedSales); */
  if (!usersWishListedSales) {
    return <div>Log in to create your wishlist</div>;
  }
  return (
    <div>
      <ul>
        {usersWishListedSales.map((userWishListItem: unknown, itemIndex: number) => {
          const itemPerks = JSON.parse(userWishListItem.perks);
          const itemMasterworks = JSON.parse(userWishListItem.masterworks);
          return (
            <div key={`item${itemIndex}`}>
              <li className="user-item-info-container">
                <img src={`http://www.bungie.net${userWishListItem.item_icon}`} alt="" />
                <span>{userWishListItem.item_name}</span>
                <ul className="user-item-perks-masterworks-info-container">
                  {Object.keys(itemPerks).map((perkColumnKey: unknown) => {
                    return (
                      <ul key={`item${itemIndex}-perkColumn${perkColumnKey}`} className="perks-unordered-list">
                        {itemPerks[perkColumnKey].map((perk: unknown, perkIndex: number) => {
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
                    );
                  })}
                </ul>
                <ul className="user-item-masterworks-info-container">
                  {itemMasterworks.map((masterwork: unknown, masterworkIndex: number) => {
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
