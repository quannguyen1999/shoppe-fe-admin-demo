// ACCOUNT
export const getAccountDetail: string = `
query AccountDetail(
  $page: Int!,
  $size: Int!,
  $id: String,
  $username: String,
  $fromBirthday: String,
  $toBirthday: String,
  $createFromDate: String,
  $createToDate: String,
  $isActive: Boolean,
  $gender: Boolean,
  $email: String,
  $listSorted: [Map]
  ) {
  listAccount(
      accountRequestDto: {
          id: $id,
          page: $page,
          size: $size,
          username: $username,
          fromBirthday: $fromBirthday,
          toBirthday: $toBirthday,
          createFromDate: $createFromDate,
          createToDate: $createToDate,
          isActive: $isActive,
          gender: $gender,
          email: $email,
          listSorted: $listSorted
      }
  ) {
    page,
    size,
    total,
    data{
      $fields
    }
  }
}
`;

//CATEGORY
export const getCategoryDetail: string = `
query CategoryDetail(
  $page: Int!,
  $size: Int!,
  $id: String,
  $name: String,
  $createFromDate: String,
  $createToDate: String,
  $listSorted: [Map]
  ) {
  listCategory(
      categoryRequestDto: {
          id: $id,
          page: $page,
          size: $size,
          name: $name,
          createFromDate: $createFromDate,
          createToDate: $createToDate,
          listSorted: $listSorted
      }
  ) {
    page,
    size,
    total,
    data{
      $fields
    }
  }
}
`;


//PRODUCT
export const getProductDetail: string = `
query ProductDetail(
  $page: Int!,
  $size: Int!,
  $id: String,
  $name: String,
  $createFromDate: String,
  $createToDate: String,
  $listSorted: [Map]
  ) {
  listProduct(
      productRequestDto: {
          id: $id,
          page: $page,
          size: $size,
          name: $name,
          createFromDate: $createFromDate,
          createToDate: $createToDate,
          listSorted: $listSorted
      }
  ) {
    page,
    size,
    total,
    data{
      $fields
    }
  }
}
`;

//ORDER
export const getOrderDetail: string = `
query OrderDetail(
  $page: Int!,
  $size: Int!,
  $id: String,
  $createFromDate: String,
  $createToDate: String,
  $listSorted: [Map]
  ) {
  listOrder(
      orderRequestDto: {
          id: $id,
          page: $page,
          size: $size,
          createFromDate: $createFromDate,
          createToDate: $createToDate,
          listSorted: $listSorted
      }
  ) {
    page,
    size,
    total,
    data{
      $fields
    }
  }
}
`;
