export type userWishListItem = {
  id: number;
  item_name: string;
  item_icon: string;
  item_hash: number;
  itemTypeDisplayName: string;
  itemFlavorText: string;
  itemTypeAndTierDisplayName: string;
  itemSaleKey: number;
  perks: string;
  masterworks: string;
  user_id: string;
};
export type matchingItem = {
  id: number;
  vendorId: number;
  itemManifestID: number;
  itemName: string;
  itemIcon: string;
  item_hash: number;
  itemTypeDisplayName: string;
  itemFlavorText: string;
  itemTypeAndTierDisplayName: string;
  itemSaleKey: number;
  perks: string;
  masterworks: string;
};

export type usersWishlistedItemsFunctions = {
  setWishListedItemsComponentState(componentName: string): void;
  setWishlistedItemEditStateFunction(userWishListItem: userWishListItem): void;
  setSelectedItemForDeletionFunction(userWishListItem: userWishListItem): void;
  usersWishListedSales: Array<{
    id: number;
    item_name: string;
    item_icon: string;
    item_hash: number;
    itemTypeDisplayName: string;
    itemFlavorText: string;
    itemTypeAndTierDisplayName: string;
    itemSaleKey: number;
    perks: string;
    masterworks: string;
    user_id: string;
  }>;
};
export type usersWishlistedItemEditFunctions = {
  setWishListedItemsComponentState(componentName: string): void;
  setWishlistedItemEditStateFunction(userWishListItem: userWishListItem): void;
  setSelectedItemForDeletionFunction(userWishListItem: userWishListItem): void;
  allVendorSales: Array<{
    id: number;
    vendorId: number;
    itemManifestID: number;
    itemName: string;
    itemIcon: string;
    itemHash: number;
    itemTypeDisplayName: string;
    itemFlavorText: string;
    itemTypeAndTierDisplayName: string;
    itemSaleKey: number;
    perks: string;
    masterworks: string;
  }>;

  wishListedItemEditInfo: {
    id: number;
    item_name: string;
    item_icon: string;
    item_hash: number;
    itemFlavorText: string;
    perks: string;
    masterworks: string;
    user_id: string;
  };
};

export type wishlistData = {
  value: null | { showData: { global_name: string; id: string } };
  vendorData: {
    data: {
      vendorData: {
        allVendorSales: Array<{
          id: number;
          vendorId: number;
          itemManifestID: number;
          itemName: string;
          itemIcon: string;
          itemHash: number;
          itemTypeDisplayName: string;
          itemFlavorText: string;
          itemTypeAndTierDisplayName: string;
          itemSaleKey: number;
          perks: string;
        }>;
      };
      usersWishListedSales?: Array<{
        id: number;
        item_name: string;
        item_icon: string;
        item_hash: number;
        itemTypeDisplayName: string;
        itemFlavorText: string;
        itemTypeAndTierDisplayName: string;
        itemSaleKey: number;
        perks: string;
        masterworks: string;
        user_id: string;
      }>;
    };
  };
};
export type userData = {
  showData: {
    global_name: string;
    id: string;
  };
};
export type currentVendorSalesLoaderData = {
  data: {
    vendorData: {
      currentVendorSales: Array<{
        id: number;
        vendorId: number;
        itemManifestID: number;
        itemName: string;
        itemIcon: string;
        itemHash: number;
        itemTypeDisplayName: string;
        itemFlavorText: string;
        itemTypeAndTierDisplayName: string;
        itemSaleKey: number;
        perks: string;
        masterWork: string;
      }>;
    };
  };
};
export type perkObject = {
  [perkColumn1: string]: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
  perkColumn2: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
  perkColumn3: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
  perkColumn4: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
};
export type masterworkObjectArray = Array<{
  masterWorkDescription: string;
  masterWorkHash: number;
  masterWorkIcon: string;
  masterWorkName: string;
}>;

export type vendorData = {
  currentVendorSales: Array<{
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
  }>;
  showData: {
    id: string;
    global_name: string;
  };
  vendorData: {
    allVendorSales: Array<{
      id: number;
      item_flavorText: string;
      item_hash: number;
      item_icon: string;
      item_name: string;
      item_type_and_tier_display_name: string;
      item_type_display_name: string;
      masterworks:
        | string
        | Array<{
            masterWorkDescription: string;
            masterWorkHash: number;
            masterWorkIcon: string;
            masterWorkName: string;
          }>;
      perks:
        | string
        | {
            perkColumn1: Array<{
              perkDescription: string;
              perkHash: number;
              perkIcon: string;
              perkName: string;
            }>;
            perkColumn2: Array<{
              perkDescription: string;
              perkHash: number;
              perkIcon: string;
              perkName: string;
            }>;
            perkColumn3: Array<{
              perkDescription: string;
              perkHash: number;
              perkIcon: string;
              perkName: string;
            }>;
            perkColumn4: Array<{
              perkDescription: string;
              perkHash: number;
              perkIcon: string;
              perkName: string;
            }>;
          };
      stats:
        | string
        | Array<{
            description: string;
            statName: string;
            statValue: number;
          }>;
      vendor_id: number;
    }>;
  };
};
export type allVendorSalesItem = {
  id: number;
  item_flavorText: string;
  item_hash: number;
  item_icon: string;
  item_name: string;
  item_type_and_tier_display_name: string;
  item_type_display_name: string;
  masterworks: Array<{
    masterWorkDescription: string;
    masterWorkHash: number;
    masterWorkIcon: string;
    masterWorkName: string;
  }>;
  perks: {
    [perkColumn1: string]: Array<{
      perkDescription: string;
      perkHash: number;
      perkIcon: string;
      perkName: string;
    }>;
    perkColumn2: Array<{
      perkDescription: string;
      perkHash: number;
      perkIcon: string;
      perkName: string;
    }>;
    perkColumn3: Array<{
      perkDescription: string;
      perkHash: number;
      perkIcon: string;
      perkName: string;
    }>;
    perkColumn4: Array<{
      perkDescription: string;
      perkHash: number;
      perkIcon: string;
      perkName: string;
    }>;
  };
  stats: Array<{
    description: string;
    statName: string;
    statValue: number;
  }>;
  vendor_id: number;
};
export type wishListedItemInfoStateType = {
  itemName: string;
  itemHash: number;
  itemIcon: string;
  perks: {
    [perkColumn1: string]: Array<{
      perkDescription: string;
      perkHash: number;
      perkIcon: string;
      perkName: string;
    } | null>;
    perkColumn2: Array<{ perkDescription: string; perkHash: number; perkIcon: string; perkName: string } | null>;
    perkColumn3: Array<{ perkDescription: string; perkHash: number; perkIcon: string; perkName: string } | null>;
    perkColumn4: Array<{ perkDescription: string; perkHash: number; perkIcon: string; perkName: string } | null>;
  };
  masterWorks: Array<{
    masterWorkDescription: string;
    masterWorkHash: number;
    masterWorkIcon: string;
    masterWorkName: string;
  }>;
};
