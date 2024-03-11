import { Menu } from "../models/menu.model";

export const AVATAR_IMAGE = "https://www.caspianpolicy.org/no-image.png"
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refreshToken";
export const NUMBER_TRY_REQUEST = "number_try_request";

export const listMenus: Array<Menu> = [ {
        id: 1,
        typeIcon: 'supervised_user_circle',
        value: 'Manage account',
        isSelected: false,
        url: 'accounts'
    },
    {
        id: 2,
        typeIcon: 'category',
        value: 'Manage Category',
        isSelected: false,
        url: 'categories'
    },
    {
        id: 3,
        typeIcon: 'keyboard_hide',
        value: 'Manage Product',
        isSelected: true,
        url: 'products'
    }
];
