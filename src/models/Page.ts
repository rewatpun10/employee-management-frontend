// models/Page.ts
export interface Page<T> {
    content: T[]; // contains the actual data for the current page which is and array of items of type T
    totalPages: number; // indicates the total number of pages available for the dataset
    totalElements: number; // indicates total number of items in the dataset across all pages
    size: number; // indicates the number of items per page
    number: number; //indicates the current page number
    numberOfElements: number; //indicates the number of items on the current page
    first: boolean; //indicates whether the current page is the first page
    last: boolean; //indicates whether the current page is the last page
}
