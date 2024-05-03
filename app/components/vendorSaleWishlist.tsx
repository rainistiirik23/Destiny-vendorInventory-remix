import { type vendorData, type allVendorSalesItem } from "~/utils/types";
import { useState } from "react";
import { saveWishListedItem } from "~/utils/requests";
export default function VendorSaleWishList(vendorData: vendorData) {
  const allVendorSales = vendorData.vendorData.allVendorSales;

  /* const [showPerkList, setShowPerkListState] = useState<boolean>(false); */
  /* const [showMasterworkList, setShowMasterworkListState] = useState<boolean>(false); */
  const [itemSearchTerm, setitemSearchTerm] = useState<string | null>(null);
  const [selectedSaleItem, setSelectedSaleItem] = useState<allVendorSalesItem | null>(null);
  const [wishListedItemInfoState, setWishListedItemInfoState] = useState<object | null>(null);

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
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              overflow: "scroll",
              maxWidth: "500px",
              maxHeight: "300px",
              justifyContent: "space-evenly",
            }}
          >
            {allVendorSales.map((saleItem, saleItemIndex: number) => {
              if (itemSearchTerm != null && saleItem.item_name.toLowerCase().includes(itemSearchTerm!.toLowerCase())) {
                return (
                  <li key={`saleItem-${saleItemIndex}`}>
                    <button
                      onClick={() => {
                        if (typeof saleItem.perks == "object") {
                          setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                          return;
                        }
                        const wishListedSaleItemObject = {
                          itemName: saleItem.item_name,
                          itemHash: saleItem.item_hash,
                          perks: [{ perkColumn1: [] }, { perkColumn2: [] }, { perkColumn3: [] }, { perkColumn4: [] }],
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
                      onClick={() => {
                        if (typeof saleItem.perks == "object") {
                          setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                          return;
                        }
                        const wishListedSaleItemObject = {
                          itemName: saleItem.item_name,
                          itemHash: saleItem.item_hash,
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
        <div className="sale-item-perks-selection-container">
          {Object.keys(selectedSaleItem.perks).map((perkColumnKey) => {
            return (
              <ul
                className="sale-item-perks-selection-container-unordered-list"
                key={`${selectedSaleItem.item_name}-${perkColumnKey}`}
                style={{ display: "flex" }}
              >
                {selectedSaleItem.perks[perkColumnKey].map((perk, perkIndex: number) => {
                  return (
                    <li
                      className="sale-item-perk-list-item"
                      key={`${selectedSaleItem.item_name}-${perkColumnKey}-${perkIndex}`}
                    >
                      <button
                        onClick={() => {
                          /* console.log(wishListedItemInfoState.perks["perkColumn1"]);
                          console.log(perkColumnKey); */
                          wishListedItemInfoState.perks[perkColumnKey].push(perk);
                          setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                        }}
                      >
                        <img style={{ backgroundColor: "blue" }} src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                        <span>{perk.perkName}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
        <div className="sale-item-masterwork-selection-container">
          <ul style={{ display: "flex" }} className="sale-item-masterwork-selection-unordered-list">
            {selectedSaleItem.masterworks.map((masterWork, masterWorkIndex) => {
              if (masterWork.masterWorkName.includes("Tier 1")) {
                return (
                  <li key={`${masterWork.masterWorkName}-${masterWorkIndex}`}>
                    <button
                      onClick={() => {
                        wishListedItemInfoState.masterWorks.push(masterWork);
                        setWishListedItemInfoState(Object.assign({}, wishListedItemInfoState));
                      }}
                    >
                      <span>{masterWork.masterWorkName}</span>
                      <img src={`http://www.bungie.net${masterWork.masterWorkIcon}`} alt="" />
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveWishListedItem(wishListedItemInfoState, vendorData.userData.showData);
            }}
            method="POST"
          >
            <button type="submit">Send</button>
          </form>
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
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            overflow: "scroll",
            maxWidth: "500px",
            maxHeight: "300px",
            justifyContent: "space-evenly",
          }}
        >
          {allVendorSales.map((saleItem, saleItemIndex: number) => {
            if (itemSearchTerm != null && saleItem.item_name.toLowerCase().includes(itemSearchTerm!.toLowerCase())) {
              return (
                <li key={`saleItem-${saleItemIndex}`}>
                  <button
                    onClick={() => {
                      if (typeof saleItem.perks == "object") {
                        setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                        return;
                      }

                      const wishListedSaleItemObject = {
                        itemName: saleItem.item_name,
                        itemHash: saleItem.item_hash,
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
                    onClick={() => {
                      if (typeof saleItem.perks == "object") {
                        return;
                      }
                      setSelectedSaleItem(Object.assign({}, saleItem as allVendorSalesItem));
                      const wishListedSaleItemObject = {
                        itemName: saleItem.item_name,
                        itemHash: saleItem.item_hash,
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
