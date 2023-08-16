import GET_CONTACT_BY_IDS from "@/Graphql/query/getContactByIds";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ContactType, GetContactsByIdsRequestType, GetContactsByIdsResponseType } from "@/types";
import { useQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";

function useFavorites(){
  const [favorites, setFavorites] = useLocalStorage<ContactType[]>("favorites", []);
  const {refetch , loading, error} = useQuery<GetContactsByIdsResponseType, GetContactsByIdsRequestType>(
    GET_CONTACT_BY_IDS,
    {
      skip: true
    }
  );

  const includeIds = useMemo(
    ()=>{
      const favs:ContactType[] = JSON.parse(localStorage.getItem("favorites")||'[]');
      return favs?.map(el => el.id)?.filter((value): value is number => value !== undefined);
    }
  ,[]);

  useEffect(()=>{
    const req = debounce(async()=>{
      const res = await refetch({ids: includeIds});
      setFavorites(res.data.contact);
    },500);

    req();

    return () => {
      req.cancel();
    }
  },[refetch, setFavorites, includeIds]);

  return{
    data:{
      loading,
      error,
      favorites: favorites,
    },
    setFavorites,
  }
}

export default useFavorites;