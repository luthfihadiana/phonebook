import CHECK_EXISTING_CONTACT from "@/Graphql/query/checkExisitingContact";
import { APIHandlerType, CheckContactType, CheckExisitingContactRequestType, CheckExistingContactResponseType } from "@/types";
import { useQuery } from "@apollo/client";

function useCheckExistingContact(){
  const {refetch, loading, error} = useQuery<CheckExistingContactResponseType, CheckExisitingContactRequestType>(
    CHECK_EXISTING_CONTACT,
    {
      skip: true
    }
  );

  const checkContact = async (data:CheckExisitingContactRequestType,{
    onSuccess = ()=>{},
    onError,
  }:APIHandlerType) =>{
    try {
      const res = await refetch(data);
      if(!res.data.contact.length) return {};
      const contacts = res.data.contact;
      const nonUniqueData = contacts.reduce<CheckContactType>((prev,curr)=>{
        const {
          firstName,
          lastName,
          phoneNumbers,
        } = data;
        const name = `${firstName} ${lastName}`;
        if( !(name in prev)
          && curr.first_name === firstName 
          && curr.last_name === lastName
        ){
          prev.name = true;
        }
        const {phoneNumbers:checkPhoneNumbers={}} = prev;
        for(const phoneNumber of phoneNumbers){
          if(!(phoneNumber in checkPhoneNumbers)){
            const isExistedPhoneNumber = curr.phones?.findIndex(el => el.number === phoneNumber);
            if(isExistedPhoneNumber!== -1){
              checkPhoneNumbers[phoneNumber] = true;
            }
          }
        }
        if(Object.keys(checkPhoneNumbers).length>0) prev.phoneNumbers = checkPhoneNumbers;
        return prev;
      },{});
      onSuccess();
      return nonUniqueData;
    }catch(e){
      onError(e as Error);
    }
  }

  return{
    data:{
      loading,
      error,
    },
    checkContact,
  }
}

export default useCheckExistingContact;