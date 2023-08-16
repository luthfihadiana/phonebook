import UPDATE_CONTACT from "@/Graphql/mutation/updateContact";
import { APIHandlerType, AddPhoneNumbersRequestType, AddPhoneNumbersResponseType, ContactFormDataType, ContactType, DeletePhoneNumbersRequestType, DeletePhoneNumbersResponseType, EditPhoneNumbersRequestType, EditPhoneNumbersResponseType, UpdateContactRequestType, UpdateContactResponseType } from "@/types";
import { useMutation } from "@apollo/client";
import useCheckExistingContact from "./useCheckExistingContact";
import DELETE_PHONE_NUMBERS from "@/Graphql/mutation/deletePhoneNumbers";
import ADD_PHONE_NUMBERS from "@/Graphql/mutation/addPhoneNumbers";
import EDIT_PHONE_NUMBER from "@/Graphql/mutation/editPhoneNumber";
import differenceBy from "lodash.differenceby";

type UpdateContactParamsType = {
  data: ContactFormDataType, 
  idParams:string | undefined,
  handler:APIHandlerType,
  oldData: ContactType,
}

function useUpdateContact(){
  const [UpdateContactMutation, {loading: loadingUpdateContact}] = useMutation<UpdateContactResponseType,UpdateContactRequestType>(
    UPDATE_CONTACT,
    {
      refetchQueries:['GET_CONTACTS']
    }
  );

  const [deletePhoneNumbers, {loading: loadingDeletePhoneNumbers}] = useMutation<DeletePhoneNumbersResponseType, DeletePhoneNumbersRequestType>(
    DELETE_PHONE_NUMBERS,
  );

  const [addPhoneNumbers, {loading: loadingAddPhoneNumbers}] = useMutation<AddPhoneNumbersResponseType, AddPhoneNumbersRequestType>(
    ADD_PHONE_NUMBERS
  );

  const [editPhoneNumber, {loading: loadingEditPhoneNumber}] = useMutation<EditPhoneNumbersResponseType, EditPhoneNumbersRequestType>(
    EDIT_PHONE_NUMBER,
  )

  const {checkContact, data} = useCheckExistingContact();

  const{
    loading: loadingCheckContact,
  } = data;

  const updateContact = async(
    {
      data,
      idParams,
      handler:{onSuccess, onError},
      oldData,
    }:UpdateContactParamsType,
  ) =>{
    const id = idParams ? parseInt(idParams) : null;
    if(!id || isNaN(id)) return;
    const nonUniqueData = await checkContact({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumbers: data.phoneNumbers.map(phoneNumber => phoneNumber.number),
      excludeIds:[id],
    }, {
      onError,
      onSuccess: () => {},
    }) || {};
    if(Object.keys(nonUniqueData).length > 0) throw nonUniqueData;
    try{
      if(data.firstName !== oldData?.first_name || data?.lastName !== oldData?.last_name){
        await UpdateContactMutation({
          variables:{
            id,
            firstName: data.firstName,
            lastName: data.lastName,
          }
        });
      }
      const newPhoneNumbers = data.phoneNumbers.filter(el => !el?.id);
      const existingPhoneNumbers = data.phoneNumbers.filter(el=> el?.id);
      const deletedPhoneNumbers = differenceBy(oldData?.phones, existingPhoneNumbers, 'id');
      const editedPhoneNumbers = differenceBy(differenceBy(existingPhoneNumbers, deletedPhoneNumbers, 'id'), oldData?.phones || [],'number');
      if(editedPhoneNumbers.length > 0){
        const mapOldData = oldData.phones?.reduce<Record<number, string>>((prev, curr)=>{
          if(!curr?.id) return prev;
          return {...prev, [curr.id]: curr.number}
        },{});
        const editedRequests = editedPhoneNumbers.map(el => editPhoneNumber({
          variables: {
            ids:{
              contact_id: id,
              number: el.id ? (mapOldData?.[el.id]|| '') : '',
            },
            number: el.number,
          }
        }));
        await Promise.all(editedRequests);
      }
      if(newPhoneNumbers.length > 0){
        await addPhoneNumbers({
          variables:{
            phones:newPhoneNumbers.map(el => ({ number: el.number, contact_id: id})),
          }
        });
      }
      if(deletedPhoneNumbers.length > 0){
        await deletePhoneNumbers({
          variables:{ids:deletedPhoneNumbers.map(el => el.id).filter((value): value is number => value !== undefined)}
        });
      }
      onSuccess();
    }catch(e){
      onError(e as Error);
    }
  }

  return {
    data: {
      loading: loadingUpdateContact || loadingCheckContact || loadingAddPhoneNumbers || loadingDeletePhoneNumbers || loadingEditPhoneNumber,
    },
    updateContact
  };
}

export default useUpdateContact;