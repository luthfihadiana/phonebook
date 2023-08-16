import Phone from "./Phone.type"

type DeletePhoneNumbersResponse = {
  delete_phone:{
    returning: Phone[],
  }
}

export default DeletePhoneNumbersResponse;