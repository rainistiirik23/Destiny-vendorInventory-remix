import {
  matchingItem as matchingItemType,
  editUserWishlistedItemProps,
  matchingItemPerks,
  wishListedItemPerk,
  masterWorkType,
  masterWorksArray,
  masterWork,
} from "../utils/types";
import { Form } from "@remix-run/react";
import { safelyJsonParse, ensureValueIsNotNullOrUndefined } from "~/utils/helpers";
export default function EditWishListedItem(props: editUserWishlistedItemProps) {
  console.log(props);
  const {
    wishListedItemEditInfo,
    setWishlistedItemEditStateFunction,
    allVendorSales,
    setWishListedItemsComponentState,
  } = props;
  const wishListedItemPerks = JSON.parse(wishListedItemEditInfo.perks);
  const wishListedItemMasterworks = JSON.parse(wishListedItemEditInfo.masterworks);
  const matchingItem: matchingItemType = ensureValueIsNotNullOrUndefined(
    allVendorSales.find((item) => {
      return item.item_hash === wishListedItemEditInfo.item_hash;
    }),
  );
  /* console.log(matchingItem); */

  const matchingItemPerks = safelyJsonParse(matchingItem.perks) as matchingItemPerks;
  const matchingItemItemMasterworks = safelyJsonParse(matchingItem.masterworks) as masterWorksArray;
  /*  console.log(wishListedItemMasterworks); */
  return (
    <div className="edit-wishlisted-item-container">
      <div className="wishlisted-item-info-container ">
        <img src={`http://www.bungie.net${wishListedItemEditInfo.item_icon}`} alt="" />
        <h1>{wishListedItemEditInfo.item_name}</h1>
      </div>
      <h1 className="wishlisted-item-perks-header">Perks</h1>
      <ul className="edit-user-item-perks-masterworks-unordered-list">
        {Object.keys(matchingItemPerks).map((perkColumnKey: string, columnKeyIndex) => {
          return (
            <li className="edit-user-item-perks-masterworks-unordered-list-item" key={`perkColumn${perkColumnKey}`}>
              <h2 className="edit-wishlisted-item-perk-column-header">{`Column ${columnKeyIndex + 1}`}</h2>
              <ul className="perks-unordered-list">
                {matchingItemPerks[perkColumnKey].map((perk, perkIndex: number) => {
                  const doesPerkMatchWithIndex = wishListedItemPerks[perkColumnKey].findIndex(
                    (wishlistedItemPerk: wishListedItemPerk) => {
                      return wishlistedItemPerk.perkName === perk.perkName;
                    },
                  );
                  if (doesPerkMatchWithIndex !== -1) {
                    return (
                      <li className="perks-unordered-list-item" key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                        <button
                          onClick={() => {
                            wishListedItemPerks[perkColumnKey].splice(doesPerkMatchWithIndex, 1);
                            wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                            setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                          }}
                        >
                          <img className="wishlisted-perk-icon" src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                        </button>
                        <div className="perk-info-container">
                          <span>{perk.perkName}</span>
                          <p>{perk.perkDescription}</p>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li
                      className="perks-unordered-list-item-inactive"
                      key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}
                    >
                      <button
                        onClick={() => {
                          wishListedItemPerks[perkColumnKey].push(perk);
                          wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                          setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                        }}
                      >
                        <img className="wishlisted-perk-icon" src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                      </button>
                      <div className="perk-info-container">
                        <span>{perk.perkName}</span>
                        <p>{perk.perkDescription}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <ul className="edit-wishlisted-item-masterwork-selection-unordered-list">
        {matchingItemItemMasterworks.map((masterwork: masterWorkType, masterworkIndex: number) => {
          const doesMasterworkMatchWithIndex = wishListedItemMasterworks.findIndex(
            (wishlistedItemMasterwork: masterWork) => {
              return (
                wishlistedItemMasterwork.masterWorkName.replace("Tier 1:", "").trim() ===
                masterwork.masterWorkName.replace("Tier 1:", "").trim()
              );
            },
          );
          if (masterwork.masterWorkName.includes("Tier 1") && doesMasterworkMatchWithIndex !== -1) {
            return (
              <li
                className="edit-wishlisted-item-masterwork-selection-unordered-list-item-active"
                key={`masterwork-${masterworkIndex}`}
              >
                <button
                  onClick={() => {
                    wishListedItemMasterworks.splice(doesMasterworkMatchWithIndex, 1);
                    wishListedItemEditInfo.masterworks = JSON.stringify(wishListedItemMasterworks);
                    setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                  }}
                >
                  <img
                    className="edit-wishlisted-item-selection-masterwork-icon"
                    src={`http://www.bungie.net${masterwork.masterWorkIcon}`}
                    alt=""
                  />
                </button>
                <span className="edit-wishlisted-item-selection-masterwork-description">
                  {masterwork.masterWorkName.replace("Tier 1:", "").trim()}
                </span>
              </li>
            );
          } else if (masterwork.masterWorkName.includes("Tier 1")) {
            return (
              <li
                className="edit-wishlisted-item-masterwork-selection-unordered-list-item"
                key={`masterwork-${masterworkIndex}`}
              >
                <button
                  key={`masterwork-${masterworkIndex}`}
                  onClick={() => {
                    const masterWorksObjectCopy = Object.assign({}, masterwork);
                    masterWorksObjectCopy.masterWorkName = masterWorksObjectCopy.masterWorkName
                      .replace("Tier 1:", "")
                      .trim();
                    wishListedItemMasterworks.push(masterWorksObjectCopy);
                    wishListedItemEditInfo.masterworks = JSON.stringify(wishListedItemMasterworks);
                    setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                  }}
                >
                  <img
                    className="edit-wishlisted-item-selection-masterwork-icon"
                    src={`http://www.bungie.net${masterwork.masterWorkIcon}`}
                    alt=""
                  />
                </button>
                <span className="edit-wishlisted-item-selection-masterwork-description">
                  {masterwork.masterWorkName.replace("Tier 1:", "").trim()}
                </span>
              </li>
            );
          }
        })}
      </ul>
      <div className="edit-wishlisted-items-submit-delete-buttons-container">
        <Form
          onSubmit={() => {
            setWishListedItemsComponentState(null);
            setWishlistedItemEditStateFunction(null);
          }}
          method="PUT"
        >
          <input name="data" value={JSON.stringify(wishListedItemEditInfo)} type="hidden"></input>
          <button className="submit-edited-wishlisted-item-button">
            <input type="submit"></input>
          </button>
        </Form>
        <button
          className="cancel-wishlisted-item-editing-button"
          onClick={() => {
            setWishListedItemsComponentState(null);
            setWishlistedItemEditStateFunction(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
