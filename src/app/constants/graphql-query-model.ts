export const getAccountDetail: string = `
query AccountDetail($page: Int!, $size: Int!) {
  listAccount(
      accountRequestDto: {
          page: $page,
          size: $size,
          username: null,
          gender: null
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