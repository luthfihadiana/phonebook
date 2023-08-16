import GET_CONTACTS from "@/Graphql/query/getContacts";
import { GetContactsRequestType, GetContactsResponseType } from "@/types";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';
import useFavorites from "./useFavorites";

const LIMIT = 12;

function useContacts(){
  const {data: {favorites, loading:loadingFavorites}, setFavorites} = useFavorites();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const {data,refetch, loading, error} = useQuery<GetContactsResponseType,GetContactsRequestType>(
    GET_CONTACTS,
    {
      skip: loadingFavorites || !favorites,
      variables: {
        limit: LIMIT,
        offset: 0,
        excludeIds: favorites?.map(el => el.id)?.filter((value): value is number => value !== undefined)||[],
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
    const req = debounce(()=>{
      refetch({
        offset: (page-1) * LIMIT
      });
    },500);

    req();

    return()=>{
      req.cancel();
    }
    
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
      totalItems: data?.contact_aggregate.aggregate.count || 0,
    },
    setPage,
    setKeyword,
    setFavorites,
    refetch,
  }
}

export default useContacts;