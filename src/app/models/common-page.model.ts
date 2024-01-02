export interface CommonPageInfo<T> {
    page: number,
    size: number,
    total: number,
    data: T[]
}