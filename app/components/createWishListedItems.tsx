import { type vendorData, type allVendorSalesItem, wishListedItemInfoStateType } from "~/utils/types";
import { useState } from "react";
import { saveWishListedItem } from "~/utils/requests";
import { Form } from "@remix-run/react";
export default function CreateWishListedItems(vendorData: vendorData) {
  const allVendorSales = vendorData.vendorData.allVendorSales;

  /* const [showPerkList, setShowPerkListState] = useState<boolean>(false); */
  /* const [showMasterworkList, setShowMasterworkListState] = useState<boolean>(false); */
  const [itemSearchTerm, setitemSearchTerm] = useState<string | null>(null);
  const [selectedSaleItem, setSelectedSaleItem] = useState<allVendorSalesItem | null>(null);
  const [wishListedItemInfoState, setWishListedItemInfoState] = useState<wishListedItemInfoStateType | null>(null);
  const userData = vendorData.showData;
  console.log(selectedSaleItem);

  if (selectedSaleItem) {
    return (
      <div className="sale-selection-container">
        <div className="sale-selection-item-search-container">
          <input
            onChange={(e) => {
              if (!e.currentTarget.value.trim()) {
                setitemSearchTerm(null);
                return;
              }
              setitemSearchTerm(e.currentTarget.value);
            }}
            type="search"
          ></input>
        </div>
        <div className="sale-selection-items-container">
          <ul className="sale-selection-items-container-unordered-list">
            {allVendorSales.map((saleItem, saleItemIndex: number) => {
              if (itemSearchTerm != null && saleItem.item_name.toLowerCase().includes(itemSearchTerm!.toLowerCase())) {
                return (
                  <li key={`saleItem-${saleItemIndex}`}>
                    <button
                      className="sale-selection-item-button"
                      onClick={() => {
                        if (typeof saleItem.perks == "object") {
                          setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                          return;
                        }
                        const wishListedSaleItemObject: wishListedItemInfoStateType = {
                          itemName: saleItem.item_name,
                          itemHash: saleItem.item_hash,
                          itemIcon: saleItem.item_icon,
                          perks: {
                            perkColumn1: [],
                            perkColumn2: [],
                            perkColumn3: [],
                            perkColumn4: [],
                          },

                          masterWorks: [],
                        };
                        setWishListedItemInfoState(Object.assign({}, wishListedSaleItemObject));

                        saleItem.perks = JSON.parse(saleItem.perks as string);
                        saleItem.masterworks = JSON.parse(saleItem.masterworks as string);
                        saleItem.stats = JSON.parse(saleItem.stats as string);
                        console.log(saleItem);

                        setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                      }}
                    >
                      <img src={`http://www.bungie.net${saleItem.item_icon}`} alt="" />
                    </button>
                  </li>
                );
              } else if (!itemSearchTerm) {
                return (
                  <li key={`saleItem-${saleItemIndex}`}>
                    <button
                      className="sale-selection-item-button"
                      onClick={() => {
                        if (typeof saleItem.perks == "object") {
                          setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                          return;
                        }
                        const wishListedSaleItemObject = {
                          itemName: saleItem.item_name,
                          itemHash: saleItem.item_hash,
                          itemIcon: saleItem.item_icon,
                          perks: { perkColumn1: [], perkColumn2: [], perkColumn3: [], perkColumn4: [] },
                          masterWorks: [],
                        };
                        setWishListedItemInfoState(Object.assign({}, wishListedSaleItemObject));
                        saleItem.perks = JSON.parse(saleItem.perks as string);
                        saleItem.masterworks = JSON.parse(saleItem.masterworks as string);
                        saleItem.stats = JSON.parse(saleItem.stats as string);
                        setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                      }}
                    >
                      <img src={`http://www.bungie.net${saleItem.item_icon}`} alt="" />
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="selected-sale-item-container">
          <div className="selected-sale-item-image-container">
            <img src={`http://www.bungie.net${selectedSaleItem.item_icon}`} alt="" />
          </div>
          <div className="selected-sale-item-info-container">
            <h2>{selectedSaleItem.item_name}</h2>
            <span>{selectedSaleItem.item_flavorText}</span>
          </div>
        </div>
        <div className="sale-item-perks-selection-container">
          {Object.keys(selectedSaleItem.perks).map((perkColumnKey, columnIndex) => {
            return (
              <>
                <h2 className="perk-column-header">{`Column ${columnIndex + 1}`}</h2>
                <ul
                  className="sale-item-perks-selection-container-unordered-list"
                  key={`${selectedSaleItem.item_name}-${perkColumnKey}`}
                >
                  {selectedSaleItem.perks[perkColumnKey].map((perk, perkIndex: number) => {
                    const doesPerkMatch = wishListedItemInfoState!.perks[perkColumnKey].find((wishlistedPerk) => {
                      return wishlistedPerk!.perkName === perk.perkName;
                    });
                    return (
                      <li
                        /*  className="sale-item-perk-list-item" */
                        className={doesPerkMatch ? "sale-item-perk-list-item-active" : "sale-item-perk-list-item"}
                        key={`${selectedSaleItem.item_name}-${perkColumnKey}-${perkIndex}`}
                      >
                        <button
                          className="sale-item-perk-selection-button"
                          onClick={() => {
                            if (doesPerkMatch) {
                              const findMatchedPerkIndex = wishListedItemInfoState!.perks[perkColumnKey].findIndex(
                                (wishlistedPerk) => {
                                  return wishlistedPerk!.perkName === perk.perkName;
                                }
                              );
                              wishListedItemInfoState!.perks[perkColumnKey].splice(findMatchedPerkIndex, 1);
                              setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                              return;
                            }
                            /* console.log(wishListedItemInfoState.perks["perkColumn1"]);
                          console.log(perkColumnKey); */
                            wishListedItemInfoState!.perks[perkColumnKey].push(perk);
                            setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                          }}
                        >
                          <img
                            style={{ backgroundColor: "blue" }}
                            src={`http://www.bungie.net${perk.perkIcon}`}
                            alt=""
                          />
                        </button>
                        <div className="sale-item-perk-info">
                          <h3>{perk.perkName}</h3>
                          <span>{perk.perkDescription}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
        </div>
        <div className="sale-item-masterwork-selection-container">
          <ul className="sale-item-masterwork-selection-unordered-list">
            {selectedSaleItem.masterworks.map((masterWork, masterWorkIndex) => {
              if (masterWork.masterWorkName.includes("Tier 1")) {
                const doesMasterworkMatch = wishListedItemInfoState!.masterWorks.find((wishListedMasterwork) => {
                  return (
                    masterWork.masterWorkName.replace("Tier 1:", "").trim() === wishListedMasterwork.masterWorkName
                  );
                });
                return (
                  <li
                    className={
                      doesMasterworkMatch
                        ? "sale-item-masterwork-selection-unordered-list-item-active"
                        : "sale-item-masterwork-selection-unordered-list-item"
                    }
                    key={`${masterWork.masterWorkName}-${masterWorkIndex}`}
                  >
                    <button
                      className="sale-item-masterwork-selection-button"
                      onClick={() => {
                        if (doesMasterworkMatch) {
                          const matchedMasterWorkIndex = wishListedItemInfoState!.masterWorks.findIndex(
                            (wishListedMasterwork) => {
                              return (
                                masterWork.masterWorkName.replace("Tier 1:", "").trim() ===
                                wishListedMasterwork.masterWorkName
                              );
                            }
                          );
                          wishListedItemInfoState!.masterWorks.splice(matchedMasterWorkIndex, 1);
                          setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                          return;
                        }
                        const masterWorksObjectCopy = Object.assign({}, masterWork);
                        masterWorksObjectCopy.masterWorkName = masterWorksObjectCopy.masterWorkName
                          .replace("Tier 1:", "")
                          .trim();
                        wishListedItemInfoState!.masterWorks.push(masterWorksObjectCopy);
                        setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                      }}
                    >
                      <img src={`http://www.bungie.net${masterWork.masterWorkIcon}`} alt="" />
                    </button>
                    <span>{masterWork.masterWorkName.replace("Tier 1:", "").trim()}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <Form
            onSubmit={(e) => {
              /*  e.preventDefault();
              saveWishListedItem(wishListedItemInfoState, vendorData.userData.showData); */
              console.log(vendorData.userData.showData);
            }}
            method="POST"
          >
            <input name="data" type="hidden" value={JSON.stringify({ wishListedItemInfoState, userData })} />
            <input type="submit"></input>
          </Form>
        </div>
      </div>
    );
  }
  return (
    <div className="sale-selection-container">
      <div className="sale-selection-item-search-container">
        <input
          onChange={(e) => {
            if (!e.currentTarget.value.trim()) {
              setitemSearchTerm(null);
              return;
            }

            setitemSearchTerm(e.currentTarget.value);
          }}
          type="search"
        ></input>
      </div>
      <div className="sale-selection-items-container">
        <ul className="sale-selection-items-container-unordered-list">
          {allVendorSales.map((saleItem, saleItemIndex: number) => {
            if (itemSearchTerm != null && saleItem.item_name.toLowerCase().includes(itemSearchTerm!.toLowerCase())) {
              return (
                <li key={`saleItem-${saleItemIndex}`}>
                  <button
                    className="sale-selection-item-button"
                    onClick={() => {
                      if (typeof saleItem.perks == "object") {
                        setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                        return;
                      }

                      const wishListedSaleItemObject = {
                        itemName: saleItem.item_name,
                        itemHash: saleItem.item_hash,
                        itemIcon: saleItem.item_icon,
                        perks: { perkColumn1: [], perkColumn2: [], perkColumn3: [], perkColumn4: [] },
                        masterWorks: [],
                      };
                      setWishListedItemInfoState(Object.assign({}, wishListedSaleItemObject));
                      saleItem.perks = JSON.parse(saleItem.perks as string);
                      saleItem.masterworks = JSON.parse(saleItem.masterworks as string);
                      saleItem.stats = JSON.parse(saleItem.stats as string);
                      console.log(saleItem);
                      setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                    }}
                  >
                    <img src={`http://www.bungie.net${saleItem.item_icon}`} alt="" />
                  </button>
                </li>
              );
            } else if (!itemSearchTerm) {
              return (
                <li key={`saleItem-${saleItemIndex}`}>
                  <button
                    className="sale-selection-item-button"
                    onClick={() => {
                      if (typeof saleItem.perks == "object") {
                        return;
                      }
                      setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                      const wishListedSaleItemObject = {
                        itemName: saleItem.item_name,
                        itemHash: saleItem.item_hash,
                        itemIcon: saleItem.item_icon,
                        perks: { perkColumn1: [], perkColumn2: [], perkColumn3: [], perkColumn4: [] },
                        masterWorks: [],
                      };
                      /*    console.log("click"); */

                      setWishListedItemInfoState(Object.assign({}, wishListedSaleItemObject));
                      saleItem.perks = JSON.parse(saleItem.perks as string);
                      saleItem.masterworks = JSON.parse(saleItem.masterworks as string);
                      saleItem.stats = JSON.parse(saleItem.stats as string);
                      /*   console.log(saleItem); */
                      setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                    }}
                  >
                    <img src={`http://www.bungie.net${saleItem.item_icon}`} alt="" />
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
