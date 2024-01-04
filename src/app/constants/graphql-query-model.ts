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
  $gender: Boolean
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
          gender: $gender
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
