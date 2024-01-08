export interface Account {
    id: number,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean 
}


export interface AccountRequestModel {
    id: string,
    username: string | null,
    birthday: Date | null,
    gender: boolean | null,
    email: string | null,
    avatar: string | null,

    //Search
    createFromDate: Date | null,
    createToDate: Date | null,
    isActive: boolean | true,
    fromBirthday: Date | null,
    toBirthday: Date | null,
    listSorted: any[] | null
    
}

export const ID: string = 'id';
export const USERNAME: string = 'username';
export const BIRTHDAY: string = 'birthday';
export const EMAIL: string = 'email';
export const PASSWORD: string = 'password';
export const CREATED_AT: string = 'createdAt';
export const UPDATED_AT: string = 'updatedAt';
export const IS_ACTIVE: string = 'isActive';


