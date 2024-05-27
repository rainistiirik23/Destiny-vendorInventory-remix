export type currentVendorSalesLoaderData ={
    data: {
        vendorData: {
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
        };
    };
};
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
