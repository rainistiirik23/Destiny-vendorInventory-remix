<<<<<<< HEAD
interface vendorData {
  currentVendorSales: Array<object>;
}
export default function CurrentVendorInventory(vendorData: vendorData) {
  const currentVendorSales: Array<{
    id?: number;
    vendorId?: number;
    itemManifestID?: number;
    itemName?: string;
    itemIcon?: string;
    itemHash?: number;
    itemTypeDisplayName?: string;
    itemFlavorText?: string;
    itemTypeAndTierDisplayName?: string;
    itemSaleKey?: number;
    perks?: string;
  }> = vendorData.vendorData.vendorData.currentVendorSales;
  /* type sale = */
  type perkObject = {
    [perkColumn1: string]: Array<{
      id: string;
      perkName: string;
      perkDescription: string;
      perkIcon: string;
      perkHash: number;
      perkTypeDisplayName: string;
      perkTypeAndTierDisplayName: string;
    }>;
    perkColumn2: Array<{
      id: string;
      perkName: string;
      perkDescription: string;
      perkIcon: string;
      perkHash: number;
      perkTypeDisplayName: string;
      perkTypeAndTierDisplayName: string;
    }>;
    perkColumn3: Array<{
      id: string;
      perkName: string;
      perkDescription: string;
      perkIcon: string;
      perkHash: number;
      perkTypeDisplayName: string;
      perkTypeAndTierDisplayName: string;
    }>;
    perkColumn4: Array<{
      id: string;
      perkName: string;
      perkDescription: string;
      perkIcon: string;
      perkHash: number;
      perkTypeDisplayName: string;
      perkTypeAndTierDisplayName: string;
    }>;
    perkColumn6: Array<{
      id: string;
      perkName: string;
      perkDescription: string;
      perkIcon: string;
      perkHash: number;
      perkTypeDisplayName: string;
      perkTypeAndTierDisplayName: string;
    }>;
  };
=======
import { perkObject, type currentVendorSalesLoaderData } from "~/utils/types";
export default function CurrentVendorInventory(vendorData: currentVendorSalesLoaderData) {
  const currentVendorSales = vendorData.data.vendorData.currentVendorSales;
>>>>>>> master
  /*  console.log(vendorData); */
  return (
    <div>
      <div>
        <ul className="vendor-sales-unordered-list">
          {currentVendorSales.map((vendorSale, index) => {
            const perkAsJson: perkObject = JSON.parse(vendorSale.perks as string);
            const masterworkObject = JSON.parse(vendorSale.masterWork);
            /*      console.log(masterworkObject); */

            /*  console.log(perkAsJson); */
            const perkObjectKeys: Array<string> = Object.keys(perkAsJson);
            return (
              <li key={`vendorSale-${index}`}>
                <div>
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
                        <>
                          <h2 className="sale-item-perks-header">{`Column ${columnIndex + 1}`}</h2>
                          <ul
                            className="sale-item-perk-column-unordered-list"
                            key={`vendorSale-${index}-perkColumn${perkColumnKey}`}
                          >
                            {perkAsJson[perkColumnKey].map((perk, perkIndex: number) => {
                              return (
                                <li
                                  className="sale-item-perk-column-unordered-list-item"
                                  key={`vendorSale-${index}-perkColumn${perkColumnKey}-perk${perkIndex}`}
                                >
                                  <img
                                    className="sale-item-perk-image"
                                    style={{ backgroundColor: "blue" }}
                                    src={`http://www.bungie.net${perk.perkIcon}`}
                                    alt=""
                                  />
                                  <div className="sale-item-perk-info-container">
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
                  <div className="sale-item-masterwork-container">
                    <h2>Masterwork</h2>
                    <div className="sale-item-masterwork-info-container">
                      <img src={`http://www.bungie.net${masterworkObject.masterWorkIcon}`} alt="masterwork icon" />
                      <span>{masterworkObject.masterWorkName}</span>
                    </div>
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
