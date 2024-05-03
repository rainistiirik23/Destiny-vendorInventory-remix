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
  }> = vendorData.data.vendorData.currentVendorSales;
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
  console.log(vendorData);
  return (
    <div>
      <div>
        <img alt=""></img>
      </div>
      <div>
        <ul>
          {currentVendorSales.map((vendorSale, index) => {
            const perkAsJson: perkObject = JSON.parse(vendorSale.perks!);
            /*  console.log(perkAsJson); */
            const perkObjectKeys: Array<string> = Object.keys(perkAsJson);
            return (
              <li key={`vendorSale-${index}`}>
                <div>
                  <div className="sale-item-container">
                    <div className="sale-item-image">
                      <img src={`http://www.bungie.net${vendorSale.itemIcon}`} alt="" />
                    </div>
                    <div className="sale-item-info">
                      <span className="sale-item-name">{vendorSale.itemName}</span>
                      <span className="sale-item-flavor-text">{vendorSale.itemFlavorText}</span>
                    </div>
                  </div>
                  <div className="sale-item-perks-container">
                    {perkObjectKeys.map((perkColumnKey) => {
                      return (
                        <ul key={`vendorSale-${index}-perkColumn${perkColumnKey}`}>
                          {perkAsJson[perkColumnKey].map((perk, perkIndex: number) => {
                            return (
                              <li key={`vendorSale-${index}-perkColumn${perkColumnKey}-perk${perkIndex}`}>
                                <img
                                  style={{ backgroundColor: "blue" }}
                                  src={`http://www.bungie.net${perk.perkIcon}`}
                                  alt=""
                                />
                                <span>{perk.perkName}</span>
                                <span>{perk.perkDescription}</span>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    })}
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
