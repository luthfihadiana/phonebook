type EditPhoneNumberRequest = {
  ids: {
    contact_id: number,
    number: string,
  },
  number: string,
};

export default EditPhoneNumberRequest;