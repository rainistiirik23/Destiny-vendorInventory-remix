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
  console.log(wishListedItemMasterworks);
  return (
    <div>
      <div>
        <img src={`http://www.bungie.net${wishListedItemEditInfo.item_icon}`} alt="" />
        <h1>{wishListedItemEditInfo.item_name}</h1>
      </div>
      <ul className="user-item-perks-masterworks-info-container">
        {Object.keys(matchingItemPerks).map((perkColumnKey: unknown, columnKeyIndex) => {
          return (
            <li key={`perkColumn${perkColumnKey}`}>
              <h2>{`Column ${columnKeyIndex + 1}`}</h2>
              <ul className="perks-unordered-list">
                {matchingItemPerks[perkColumnKey].map((perk: unknown, perkIndex: number) => {
                  const doesPerkMatchWithIndex = wishListedItemPerks[perkColumnKey].findIndex(
                    (wishlistedItemPerk: any) => {
                      return wishlistedItemPerk.perkName === perk.perkName;
                    }
                  );
                  if (doesPerkMatchWithIndex !== -1) {
                    return (
                      <li key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                        <button
                          onClick={() => {
                            wishListedItemPerks[perkColumnKey].splice(doesPerkMatchWithIndex, 1);
                            wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                            setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                          }}
                        >
                          <img
                            style={{ backgroundColor: "black" }}
                            src={`http://www.bungie.net${perk.perkIcon}`}
                            alt=""
                          />
                        </button>
                        <span>{perk.perkName}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={`perkColumn${perkColumnKey}-perk-${perkIndex}`}>
                      <button
                        onClick={() => {
                          wishListedItemPerks[perkColumnKey].push(perk);
                          wishListedItemEditInfo.perks = JSON.stringify(wishListedItemPerks);
                          setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                        }}
                      >
                        <img style={{ backgroundColor: "blue" }} src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                      </button>
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
        {matchingItemItemMasterworks.map((masterwork: unknown, masterworkIndex: number) => {
          const doesMasterworkMatchWithIndex = wishListedItemMasterworks.findIndex((wishlistedItemMasterwork: any) => {
            return (
              wishlistedItemMasterwork.masterWorkName.replace("Tier 1:", "").trim() ===
              masterwork.masterWorkName.replace("Tier 1:", "").trim()
            );
          });
          if (masterwork.masterWorkName.includes("Tier 1") && doesMasterworkMatchWithIndex !== -1) {
            return (
              <li key={`masterwork-${masterworkIndex}`}>
                <button
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    wishListedItemMasterworks.splice(doesMasterworkMatchWithIndex, 1);
                    wishListedItemEditInfo.masterworks = JSON.stringify(wishListedItemMasterworks);
                    setWishlistedItemEditStateFunction(Object.assign({}, wishListedItemEditInfo));
                  }}
                >
                  <img src={`http://www.bungie.net${masterwork.masterWorkIcon}`} alt="" />
                </button>
                <span>{masterwork.masterWorkName.replace("Tier 1:", "").trim()}</span>
              </li>
            );
          } else if (masterwork.masterWorkName.includes("Tier 1")) {
            return (
              <li key={`masterwork-${masterworkIndex}`}>
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
                  <img src={`http://www.bungie.net${masterwork.masterWorkIcon}`} alt="" />
                </button>
                <span>{masterwork.masterWorkName.replace("Tier 1:", "").trim()}</span>
              </li>
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
