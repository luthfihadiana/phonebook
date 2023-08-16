import Phone from "./Phone.type"

type AddPhoneNumbersResponse = {
  insert_phone:{
    returning: Phone[],
  }
}

export default AddPhoneNumbersResponse