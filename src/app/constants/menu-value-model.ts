import { Menu } from "../models/menu.model";

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
