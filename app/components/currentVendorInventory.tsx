import { perkObject, type currentVendorSalesLoaderData, type masterWork } from "~/utils/types";
import bansheeImage from "~/src/assets/images/300px-Banshee44Infobox 1@2x.png";
import { useEffect, useState } from "react";
import { selectedPerkWithState } from "~/utils/types";
export default function CurrentVendorInventory(vendorData: currentVendorSalesLoaderData) {
  const currentVendorSales = vendorData.vendorData.currentVendorSales;

  return (
    <div>
      <div className="vendor-info-container">
        <div>
          <img src={bansheeImage} />
        </div>
        <div>
          <h2 className="vendor-name-header">Vendor name</h2>
          <p className="vendor-description">Brief description of vendor</p>
        </div>
      </div>
      <div>
        <ul className="vendor-sales-unordered-list">
          {currentVendorSales.map((vendorSale, index) => {
            const perkAsJson: perkObject = JSON.parse(vendorSale.perks as string);
            const masterworkObject: masterWork = JSON.parse(vendorSale.masterWork);
            /*      console.log(masterworkObject); */

            /*  console.log(perkAsJson); */
            const perkObjectKeys: Array<string> = Object.keys(perkAsJson);
            return (
              <li className="sale-list-item" key={`vendorSale-${index}`}>
                <div className="sale-item-container">
                  <div className="sale-item-image-container">
                    <img className="sale-item-image" src={`http://www.bungie.net${vendorSale.itemIcon}`} alt="" />
                  </div>
                  <div className="sale-item-info">
                    <h1 className="sale-item-name">{vendorSale.itemName}</h1>
                    <span className="sale-item-flavor-text">{vendorSale.itemFlavorText}</span>
                  </div>
                </div>
                <div className="sale-item-perks-container">
                  {perkObjectKeys.map((perkColumnKey, columnIndex) => {
                    if (perkColumnKey === "perkColumn6") {
                      return;
                    }
                    return (
                      <div key={`vendorSale-${index}-perkColumn${perkColumnKey}`}>
                        {/*    <h2 className="sale-item-perks-header">{`Column ${columnIndex + 1}`}</h2> */}
                        <ul className="sale-item-perk-column-unordered-list">
                          {perkAsJson[perkColumnKey].map((perk, perkIndex: number) => {
                            return (
                              <li
                                className="sale-item-perk-column-unordered-list-item"
                                key={`vendorSale-${index}-perkColumn${perkColumnKey}-perk${perkIndex}`}
                                onClick={() => {
                                  if (vendorData.selectedItemPerkState) {
                                    vendorData.setSelectedItemPerkForDisplayFunction(null);
                                    return;
                                  }
                                  vendorData.setSelectedItemPerkForDisplayFunction(Object.assign({}, perk));
                                }}
                              >
                                <img
                                  key={`vendorSale-${index}-perkColumn${perkColumnKey}-perk${perkIndex}-image`}
                                  className="sale-item-perk-image"
                                  src={`http://www.bungie.net${perk.perkIcon}`}
                                  alt=""
                                />
                                <div
                                  key={`vendorSale-${index}-perkColumn${perkColumnKey}-perk${perkIndex}-perk-info`}
                                  className="sale-item-perk-info-container"
                                >
                                  <div>
                                    <img src={`http://www.bungie.net${perk.perkIcon}`} alt="" />
                                  </div>
                                  <div>
                                    <h3>{perk.perkName}</h3>
                                    <span>{perk.perkDescription}</span>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="sale-item-masterwork-container">
                  <h2>Masterwork</h2>
                  <div
                    className="sale-item-masterwork-info-container"
                    onClick={() => {
                      vendorData.setSelectedItemMasterworkForDisplayFunction(masterworkObject);
                    }}
                  >
                    <img
                      className="sale-item-masterwork-icon"
                      src={`http://www.bungie.net${masterworkObject.masterWorkIcon}`}
                      alt="masterwork icon"
                    />
                    <span className="sale-item-masterwork-description">{masterworkObject.masterWorkName}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
