import GET_CONTACTS from "@/Graphql/query/getContacts";
import { GetContactsRequestType, GetContactsResponseType } from "@/types";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import debounce from 'lodash.debounce';

const LIMIT = 9;

function useContacts(){
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const {data,refetch, loading, error} = useQuery<GetContactsResponseType,GetContactsRequestType>(
    GET_CONTACTS,
    {
      variables: {
        limit: LIMIT,
        offset: 0,
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
    },
    setPage,
    setKeyword,
  }
}

export default useContacts;