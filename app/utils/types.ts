export type allVendorSalesItem = {
  id: number;
  item_flavorText: string;
  item_hash: number;
  item_icon: string;
  item_name: string;
  item_type_and_tier_display_name: string;
  item_type_display_name: string;
  masterworks: string | masterWorksArray;
  perks: string | perkObject;
  stats:
    | string
    | Array<{
        description: string;
        statName: string;
        statValue: number;
      }>;
  vendor_id: number;
};
export type selectedVendorSaleItem = {
  id: number;
  item_flavorText: string;
  item_hash: number;
  item_icon: string;
  item_name: string;
  item_type_and_tier_display_name: string;
  item_type_display_name: string;
  masterworks: masterWorksArray;
  perks: perkObject;
  stats:
    | string
    | Array<{
        description: string;
        statName: string;
        statValue: number;
      }>;
  vendor_id: number;
};
export type allVendorSalesData = Array<allVendorSalesItem>;

type usersWishListedSales = Array<{
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
export type userWishListItem = {
  id: number;
  item_name: string;
  item_icon: string;
  item_hash: number;
  itemFlavorText: string;
  perks: string;
  masterworks: string;
  user_id: string;
};
export type masterWorkType = {
  masterWorkDescription: string;
  masterWorkHash: number | string;
  masterWorkIcon: string;
  masterWorkName: string;
};

export type wishListedItemPerk = {
  perkDescription: string;
  perkHash: number;
  perkIcon: string;
  perkName: string;
};
export type perkObject = {
  [perkColumn: string]: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
};

export type selectedPerkWithState = {
  perkDescription: string;
  perkHash: number;
  perkIcon: string;
  perkName: string;
} | null;
export type perk = {
  perkDescription: string;
  perkHash: number;
  perkIcon: string;
  perkName: string;
};
export type matchingItemPerks = {
  [perkColumn: string]: Array<{
    perkDescription: string;
    perkHash: number;
    perkIcon: string;
    perkName: string;
  }>;
};
export type masterWork = {
  masterWorkDescription: string;
  masterWorkHash: number;
  masterWorkIcon: string;
  masterWorkName: string;
};

export type masterWorksArray = Array<masterWork>;

export type matchingItem = {
  id: number;
  item_name: string;
  item_icon: string;
  item_hash: number;
  perks: string | perkObject;
  masterworks: string | masterWorksArray;
};
export type wishListedItemEditInfoType = {
  id: number;
  item_name: string;
  item_icon: string;
  item_hash: number;
  itemFlavorText: string;
  perks: string;
  masterworks: string;
  user_id: string;
};

export interface wishListComponentStateFunctionProp {
  setWishListedItemsComponentState(componentName: string | null): void;
}
export interface wishListedVendorSalesProps extends wishListComponentStateFunctionProp {
  setWishlistedItemEditStateFunction(wishListedItemEditInfo: wishListedItemEditInfoType | null): void;
  setSelectedItemForDeletionFunction(wishListedItemEditInfo: userWishListItem | null): void;
  usersWishListedSales: usersWishListedSales | undefined;
}
export interface deleteUserWishlistedItemProps extends wishListComponentStateFunctionProp {
  setSelectedItemForDeletionFunction(userWishListItem: userWishListItem | null): void;
  selectedItemForDeletion: {
    id: number;
    item_name: string;
    item_icon: string;
    item_hash: number;
    perks: string;
    masterworks: string;
    user_id: string;
  } | null;
}
export type requiredUserData = {
  global_name: string;
  id: string;
  username: string;
};
export interface createUserWishListedItemProps extends wishListComponentStateFunctionProp {
  userData: {
    global_name: string;
    id: string;
    username: string;
  };
  vendorData: { allVendorSales: allVendorSalesData };
}
export interface editUserWishlistedItemProps extends wishListComponentStateFunctionProp {
  setWishlistedItemEditStateFunction(userWishListItem: userWishListItem | null): void;
  allVendorSales: allVendorSalesData;

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
}
export type navigationProps = {
  userData:
    | {
        global_name: string;
        id: string;
        username: string;
      }
    | undefined;
  setBurgerMenuStateFunction: Function;
};
export type userData = {
  userData:
    | {
        global_name: string;
        id: string;
        username: string;
      }
    | undefined;
};

export interface wishlistUserData {
  vendorData: {
    allVendorSales: allVendorSalesData;
  };
  usersWishListedSales: usersWishListedSales | undefined;
  userData:
    | {
        global_name: string;
        id: string;
        username: string;
      }
    | undefined;
}
/* export interface possiblyUndefinedUserDataWithVendordata extends wishlistUserData {
  userData?: {
    global_name: string;
    id: string;
    username: string;
  };
}
export interface requiredUserDataWithVendorData extends wishlistUserData {
  userData: {
    global_name: string;
    id: string;
    username: string;
  };
} */

export type currentVendorSalesLoaderData = {
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
  userData:
    | {
        global_name: string;
        id: string;
        username: string;
      }
    | undefined;
  setSelectedItemPerkForDisplayFunction: Function;
  selectedItemPerkState: perk | null;
  setSelectedItemMasterworkForDisplayFunction: Function;
  selectedItemMasterWorkState: masterWork | null;
};
export type masterworkObjectArray = Array<{
  masterWorkDescription: string;
  masterWorkHash: number;
  masterWorkIcon: string;
  masterWorkName: string;
}>;
export type wishListedItemInfoStateType = {
  itemName: string;
  itemHash: number;
  itemIcon: string;
  perks:
    | perkObject
    | {
        [perkColumn: string]: perk[];
      };

  masterWorks: masterWorksArray;
};
