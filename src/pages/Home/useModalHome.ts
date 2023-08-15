import toast from "react-hot-toast";
import useDeleteContact from "@/api/useDeleteContact";
import { ContactType, GetContactsRequestType, GetContactsResponseType, HomeModalEnum } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { ApolloQueryResult } from "@apollo/client";
import useModal from "@/hooks/useModal";

type useModalHomeParam = {
  setFavorites: Dispatch<SetStateAction<ContactType[]>>,
  refetchContacts: (variables?: Partial<GetContactsRequestType> | undefined) => Promise<ApolloQueryResult<GetContactsResponseType>>
}

function useModalHome({
  setFavorites,
  refetchContacts,
}:useModalHomeParam){
  const {deleteContact:deleteContactMutation, data:{loading:loadingDeleteContact}} = useDeleteContact();
  const onSuccesDeleted = (contact:ContactType) =>{
    toast.error(`${contact.first_name} ${contact.last_name} have been deleted`);
  }
  const addToFavorite = (contact:ContactType) => {
    setFavorites(prev=>[...prev, contact]);
    toast.success(`${contact.first_name} ${contact.last_name} added to favorites`);
  }
  const deleteFromFavorite = (contact:ContactType, isUsingToast:boolean = true) =>{
    const {id} = contact;
    setFavorites(prev => {
      const newArray = [...prev];
      const index = newArray.findIndex(el => el.id === id);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      return newArray;
    });
    if(isUsingToast) toast.error(`${contact.first_name} ${contact.last_name} removed from favorites`);
  }

  const deleteContact = async(contact:ContactType, isFavorite=false) =>{
    const {id} = contact;
    if(!id|| loadingDeleteContact) return;
    await deleteContactMutation(id, {
      onSuccess: () => onSuccesDeleted(contact),
      onError: (e:Error) => toast.error(e.message),
    });
    if(isFavorite) deleteFromFavorite(contact, false);
    refetchContacts();
  }

  const modal = useModal<ContactType,HomeModalEnum>({
    config:{
      submitAction:{
        [HomeModalEnum.Delete]: (contact:ContactType) => deleteContact(contact,false),
        [HomeModalEnum.Favorite]: addToFavorite,
        [HomeModalEnum.RemoveFavorite]: (contact:ContactType) =>deleteFromFavorite(contact, true),
      },
      title:{
        [HomeModalEnum.Delete]: "Delete Contact",
        [HomeModalEnum.Favorite]: "Add Favorite",
        [HomeModalEnum.RemoveFavorite]: "Remove Favorite",
      },
      desc:{
        [HomeModalEnum.Delete]: (contact:ContactType) => `Are you sure delete ${contact.first_name} ${contact.last_name} ?`,
        [HomeModalEnum.Favorite]: (contact:ContactType) => `Are you sure add ${contact.first_name} ${contact.last_name} to favorites ?`,
        [HomeModalEnum.RemoveFavorite]: (contact:ContactType) => `Are you sure delete ${contact.first_name} ${contact.last_name} from favorites ?`,
      }
    }
  });

  return modal;
}

export default useModalHome;