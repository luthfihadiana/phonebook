type checkExistingContactRequest = {
  firstName: string,
  lastName: string,
  phoneNumbers: string[],
  excludeIds?: number[],
}

export default checkExistingContactRequest;