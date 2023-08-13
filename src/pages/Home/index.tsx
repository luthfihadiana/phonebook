import { HomeSection, List, SearchContainer, SearchInput } from "./index.styles";
import { BottomBar, ContactItem, Pagination } from "@/components";
import useContacts from "@/api/useContacts";


function Home(){
  const {data, setKeyword, setPage} = useContacts();

  const {
    keyword,
    contacts,
    loading,
    page,
    totalPages
  } = data;
  
  return (
    <>
      <HomeSection direction="column" size={1.6}>
        <h2>Contact List</h2>
        <SearchContainer>
          <SearchInput 
            placeholder="Search contact name ...."
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            disabled={loading}
          />
        </SearchContainer>
        <List>
          {
            contacts?.map((contact)=>(
              <ContactItem
                key={contact.id}
                data={contact}
                onClickContact={(id)=>console.log(id)}
                onClickDelete={(id)=> console.log('deleted',id)}
                onClickStar={(id)=> console.log('favorite',id)}
              />
            ))
          }
        </List>
      </HomeSection>
      <BottomBar>
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </BottomBar>
    </>
  );
}

export default Home;