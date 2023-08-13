type GetContactsRequest = {
  offset?: number,
  limit?: number,
  keyword?: string,
  excludeIds?:number[],
}

export default GetContactsRequest;