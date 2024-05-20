import { Form, useNavigate, useSubmit } from "@remix-run/react";
export default function EditWishListedItem(props: any) {
  /* console.log(props); */
  const { wishListedItemEditInfo, setWishlistedItemEditStateFunction, allVendorSales, setComponentStateFunction } =
    props;
  const wishListedItemPerks = JSON.parse(wishListedItemEditInfo.perks);
  const wishListedItemMasterworks = JSON.parse(wishListedItemEditInfo.masterworks);
  const matchingItem = allVendorSales.find((item: object) => {
    return item.item_hash === wishListedItemEditInfo.item_hash;
  });

  const matchingItemPerks = JSON.parse(matchingItem.perks);
  const matchingItemItemMasterworks = JSON.parse(matchingItem.masterworks);
  /*  console.log(props); */
  return (
    <div>
      <img src={`http://www.bungie.net${wishListedItemEditInfo.item_icon}`} alt="" />
      <span>{wishListedItemEditInfo.item_name}</span>
      <ul className="user-item-perks-masterworks-info-container">
        {Object.keys(matchingItemPerks).map((perkColumnKey: unknown) => {
          return (
            <ul key={`perkColumn${perkColumnKey}`} className="perks-unordered-list">
              {matchingItemPerks[perkColumnKey].map((perk: unknown, perkIndex: number) => {
                const doesPerkMatchWithIndex = wishListedItemPerks[perkColumnKey].findIndex(
                  (wishlistedItemPerk: any) => {
                    return wishlistedItemPerk.perkName === perk.perkName;
                  }
                );
                if (doesPerkMatchWithIndex !== -1) {
                  return (
                    <button
                      key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}
                      onClick={() => {
                        wishListedItemPerks[perkColumnKey].splice(doesPerkMatchWithIndex, 1);
                        wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                        setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                      }}
                    >
                      <li>
                        <img
                          style={{ backgroundColor: "black" }}
                          src={`http://www.bungie.net${perk.perkIcon}`}
                          alt=""
                        />
                        <span>{perk.perkName}</span>
                      </li>
                    </button>
                  );
                }
                return (
                  <button
                    key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}
                    onClick={() => {
                      wishListedItemPerks[perkColumnKey].push(perk);
                      wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                      setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                    }}
                  >
                    <li key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                      <img style={{ backgroundColor: "blue" }} src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                      <span>{perk.perkName}</span>
                    </li>
                  </button>
                );
              })}
            </ul>
          );
        })}
      </ul>
      <ul className="user-item-masterworks-info-container">
        {matchingItemItemMasterworks.map((masterwork: unknown, masterworkIndex: number) => {
          const doesMasterworkMatchWithIndex = wishListedItemMasterworks.findIndex((wishlistedItemMasterwork: any) => {
            return wishlistedItemMasterwork.masterWorkName === masterwork.masterWorkName;
          });
          if (masterwork.masterWorkName.includes("Tier 1") && doesMasterworkMatchWithIndex !== -1) {
            return (
              <button
                key={`masterwork-${masterworkIndex}`}
                onClick={() => {
                  wishListedItemMasterworks.splice(doesMasterworkMatchWithIndex, 1);
                  wishListedItemEditInfo.masterworks = JSON.stringify(wishListedItemMasterworks);
                  setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                }}
              >
                <li style={{ backgroundColor: "black" }}>
                  <img src={`http://www.bungie.net${masterwork.masterWorkIcon}`} alt="" />
                  <span>{masterwork.masterWorkName}</span>
                </li>
              </button>
            );
          } else if (masterwork.masterWorkName.includes("Tier 1")) {
            return (
              <button
                key={`masterwork-${masterworkIndex}`}
                onClick={() => {
                  wishListedItemMasterworks.push(masterwork);
                  wishListedItemEditInfo.masterworks = JSON.stringify(wishListedItemMasterworks);
                  setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                }}
              >
                <li>
                  <img src={`http://www.bungie.net${masterwork.masterWorkIcon}`} alt="" />
                  <span>{masterwork.masterWorkName}</span>
                </li>
              </button>
            );
          }
        })}
      </ul>
      <Form
        onSubmit={(event) => {
          setComponentStateFunction(null);
          setWishlistedItemEditStateFunction(null);
        }}
        method="PUT"
      >
        <input name="data" value={JSON.stringify(wishListedItemEditInfo)} type="hidden"></input>
        <input type="submit"></input>
      </Form>
    </div>
  );
}
