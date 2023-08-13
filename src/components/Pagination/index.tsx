import { Dispatch, SetStateAction } from "react";
import { Page, PaginationButton, PaginationContainer, PaginationItem } from "./index.styles";

type PaginationPropType = {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  totalPages: number,
}

function Pagination({
  page,
  setPage,
  totalPages = 0,
}:PaginationPropType){
  console.log(totalPages);
  return(
    <PaginationContainer>
      <PaginationItem>
        <PaginationButton
          onClick={()=> setPage(page-1)}
          disabled={page===1}
        >
          Previous
        </PaginationButton>
        {
          page > 1 && (
            <>
              <PaginationButton 
                onClick={()=> setPage(1)}
              >
                1
              </PaginationButton>
              <span>...</span>
            </>
          )
        }
        <Page>{page}</Page>
        {
          page < totalPages && (
            <>
              <span>...</span>
              <PaginationButton 
                onClick={()=>setPage(totalPages)}
              >
                {totalPages}
              </PaginationButton>
            </>
          )
        }
        <PaginationButton
          onClick={()=>setPage(page+1)} 
          disabled={page === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationItem>
    </PaginationContainer>
  );
}

export default Pagination;