import Phone from "./Phone.type";

type  AddPhoneNumbersRequest = {
  phones: (Phone & {contact_id: number})[],
};

export default AddPhoneNumbersRequest;