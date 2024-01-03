export interface Account {
    id: number,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean 
}

export const ID: string = 'id';
export const USERNAME: string = 'username';
export const PASSWORD: string = 'password';
export const CREATED_AT: string = 'createdAt';
export const UPDATED_AT: string = 'updatedAt';
export const IS_ACTIVE: string = 'isActive';


