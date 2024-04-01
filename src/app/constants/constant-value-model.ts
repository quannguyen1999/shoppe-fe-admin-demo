import { Menu } from "../models/menu.model";

export const AVATAR_IMAGE = "https://www.caspianpolicy.org/no-image.png"
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refreshToken";
export const NUMBER_TRY_REQUEST = "number_try_request";

export const listMenus: Array<Menu> = [ {
        id: 1,
        typeIcon: 'account_circle',
        value: 'Manage account',
        isSelected: false,
        url: 'accounts'
    },
    {
        id: 2,
        typeIcon: 'developer_board',
        value: 'Manage Category',
        isSelected: false,
        url: 'categories'
    },
    {
        id: 3,
        typeIcon: 'devices_other',
        value: 'Manage Product',
        isSelected: true,
        url: 'products'
    },
    {
        id: 4,
        typeIcon: 'shopping_cart',
        value: 'Manage Order',
        isSelected: false,
        url: 'order'
        
    },
    {
        id: 5,
        typeIcon: 'redeem',
        value: 'Manage Campaign',
        isSelected: false,
        url: 'campaign'
        
    }
];
