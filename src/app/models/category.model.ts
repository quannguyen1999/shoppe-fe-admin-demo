export interface Category {
    id: number,
    name: string,
    image: string
}

export interface CagegoryRequestModel {
    id: string,
    name: string | null,
    image: string | null,

    //Search
    createFromDate: Date | null,
    createToDate: Date | null,
    listSorted: any[] | null
    listFields: any[] | undefined
}

export const ID: string = 'id';
export const NAME: string = 'name';
export const IMAGE: string = 'image';
export const CREATED_AT: string = 'createdAt';
export const UPDATED_AT: string = 'updatedAt';