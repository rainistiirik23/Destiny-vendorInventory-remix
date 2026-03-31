import {
  wishListedItemInfoStateType,
  createUserWishListedItemProps,
  type allVendorSalesItem,
  type perk,
} from "~/utils/types";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { ensureValueIsnotString } from "~/utils/helpers";
export default function CreateWishListedItems(vendorData: createUserWishListedItemProps) {
  const allVendorSales = vendorData.vendorData.allVendorSales;

  /* const [showPerkList, setShowPerkListState] = useState<boolean>(false); */
  /* const [showMasterworkList, setShowMasterworkListState] = useState<boolean>(false); */
  const [itemSearchTerm, setitemSearchTerm] = useState<string | null>(null);
  const [selectedSaleItem, setSelectedSaleItem] = useState<allVendorSalesItem | null>(null);
  const [wishListedItemInfoState, setWishListedItemInfoState] = useState<wishListedItemInfoStateType | null>(null);
  const userData = vendorData.userData;
  const { setWishListedItemsComponentState } = vendorData;
  if (selectedSaleItem) {
    return (
      <>
        <div className="weapon-selection-header-container">
          <h1>Select a weapon</h1>
        </div>
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
                if (
                  itemSearchTerm != null &&
                  saleItem.item_name.toLowerCase().includes(itemSearchTerm!.toLowerCase())
                ) {
                  return (
                    <li key={`saleItem-${saleItemIndex}`}>
                      <button
                        className="sale-selection-item-button"
                        onClick={() => {
                          if (typeof saleItem.perks == "object") {
                            setSelectedSaleItem(Object.assign({}, saleItem));
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

                          setSelectedSaleItem(Object.assign({}, saleItem));
                        }}
                      >
                        <img
                          className="sale-item-selection-icon"
                          src={`http://www.bungie.net${saleItem.item_icon}`}
                          alt=""
                        />
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
                            setSelectedSaleItem(Object.assign({}, saleItem));
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
                          setSelectedSaleItem(Object.assign({}, saleItem));
                        }}
                      >
                        <img
                          className="sale-item-selection-icon"
                          src={`http://www.bungie.net${saleItem.item_icon}`}
                          alt=""
                        />
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
          <div className="sale-item-unordered-list-header-perks-selection-container">
            {Object.keys(selectedSaleItem.perks).map((perkColumnKey: string, columnIndex) => {
              if (typeof selectedSaleItem.perks !== "string") {
                return (
                  <>
                    <div className="sale-item-header-perks-selection-container">
                      <h2 className="perk-column-header">{`Column ${columnIndex + 1}`}</h2>
                      <ul
                        className="sale-item-perks-selection-container-unordered-list"
                        key={`${selectedSaleItem.item_name}-${perkColumnKey}`}
                      >
                        {selectedSaleItem.perks[perkColumnKey].map((perk: perk, perkIndex) => {
                          const doesPerkMatch = wishListedItemInfoState!.perks[perkColumnKey].find((wishlistedPerk) => {
                            return wishlistedPerk!.perkName === perk.perkName;
                          });
                          if (doesPerkMatch) {
                            return (
                              <li
                                /*  className="sale-item-perk-list-item" */
                                className="sale-item-perk-list-item-active"
                                key={`${selectedSaleItem.item_name}-${perkColumnKey}-${perkIndex}`}
                              >
                                <button
                                  className="sale-item-perk-selection-button"
                                  onClick={() => {
                                    if (doesPerkMatch) {
                                      const findMatchedPerkIndex = wishListedItemInfoState!.perks[
                                        perkColumnKey
                                      ].findIndex((wishlistedPerk) => {
                                        return wishlistedPerk!.perkName === perk.perkName;
                                      });
                                      wishListedItemInfoState!.perks[perkColumnKey].splice(findMatchedPerkIndex, 1);
                                      setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                                      return;
                                    }

                                    if (wishListedItemInfoState !== null) {
                                      wishListedItemInfoState.perks[perkColumnKey].push(perk);
                                      setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                                    }
                                  }}
                                >
                                  <img src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                                </button>
                                <div className="sale-item-perk-info">
                                  <h3>{perk.perkName}</h3>
                                  <span>{perk.perkDescription}</span>
                                </div>
                              </li>
                            );
                          }
                          return (
                            <li
                              /*  className="sale-item-perk-list-item" */
                              className="sale-item-perk-list-item"
                              key={`${selectedSaleItem.item_name}-${perkColumnKey}-${perkIndex}`}
                            >
                              <button
                                className="sale-item-perk-selection-button"
                                onClick={() => {
                                  if (doesPerkMatch) {
                                    const findMatchedPerkIndex = wishListedItemInfoState!.perks[
                                      perkColumnKey
                                    ].findIndex((wishlistedPerk) => {
                                      return wishlistedPerk!.perkName === perk.perkName;
                                    });
                                    wishListedItemInfoState!.perks[perkColumnKey].splice(findMatchedPerkIndex, 1);
                                    setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                                    return;
                                  }

                                  if (wishListedItemInfoState !== null) {
                                    wishListedItemInfoState.perks[perkColumnKey].push(perk);
                                    setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                                  }
                                }}
                              >
                                <img src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                              </button>
                              <div className="sale-item-perk-info">
                                <h3>{perk.perkName}</h3>
                                <span>{perk.perkDescription}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="sale-item-masterwork-selection-container">
            <ul className="sale-item-masterwork-selection-unordered-list">
              {ensureValueIsnotString(selectedSaleItem.masterworks).map((masterWork, masterWorkIndex) => {
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
                              },
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
                        <img
                          className="sale-item-selection-masterwork-icon"
                          src={`http://www.bungie.net${masterWork.masterWorkIcon}`}
                          alt=""
                        />
                      </button>
                      <span className="sale-item-selection-masterwork-description">
                        {masterWork.masterWorkName.replace("Tier 1:", "").trim()}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="item-wishlisting-submit-delete-buttons-container">
            <Form
              method="POST"
              onSubmit={() => {
                setWishListedItemInfoState(null);
                setWishListedItemsComponentState(null);
              }}
            >
              <input name="data" type="hidden" value={JSON.stringify({ wishListedItemInfoState, userData })} />
              <input className="submit-wishlisted-item" type="submit"></input>
            </Form>
            <button
              className="cancel-sale-item-wishlisting-button"
              onClick={() => {
                setWishListedItemsComponentState(null);
                setWishListedItemInfoState(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="weapon-selection-header-container">
        <h1>Select a weapon</h1>
      </div>
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
                          setSelectedSaleItem(Object.assign({}, saleItem));
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
                        setSelectedSaleItem(Object.assign({}, saleItem));
                      }}
                    >
                      <img
                        className="sale-item-selection-icon"
                        src={`http://www.bungie.net${saleItem.item_icon}`}
                        alt=""
                      />
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
                        setSelectedSaleItem(Object.assign({}, saleItem));
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
                        setSelectedSaleItem(Object.assign({}, saleItem));
                      }}
                    >
                      <img
                        className="sale-item-selection-icon"
                        src={`http://www.bungie.net${saleItem.item_icon}`}
                        alt=""
                      />
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
