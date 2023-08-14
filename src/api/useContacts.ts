import GET_CONTACTS from "@/Graphql/query/getContacts";
import { ContactType, GetContactsRequestType, GetContactsResponseType } from "@/types";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import debounce from 'lodash.debounce';

const LIMIT = 12;

function useContacts(){
  const [favorites, setFavorites] = useLocalStorage<ContactType[]>("favorites", []);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const {data,refetch, loading, error} = useQuery<GetContactsResponseType,GetContactsRequestType>(
    GET_CONTACTS,
    {
      variables: {
        limit: LIMIT,
        offset: 0,
        excludeIds: favorites?.map(el => el.id)?.filter((value): value is number => value !== undefined),
      }
    }
  );

  useEffect(()=>{
    const req = debounce(()=>{
      refetch({offset: 0,keyword})
    },500);

    req();

    return()=>{
      req.cancel();
    }
  },[keyword, refetch]);

  useEffect(()=>{
    refetch({
      offset: (page-1) * LIMIT
    })
  },[page, refetch])

  const totalPages = useMemo(()=>{
    if(data) return Math.ceil(data?.contact_aggregate.aggregate.count / LIMIT);
    return 0;
  },[data])

  return{
    data: {
      page,
      keyword,
      error,
      loading,
      contacts: data?.contact,
      totalPages,
      favorites,
    },
    setPage,
    setKeyword,
    setFavorites,
  }
}

export default useContacts;