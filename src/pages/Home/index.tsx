import { HomeSection, List, SearchContainer, SearchInput } from "./index.styles";
import { BottomBar, ContactItem, Pagination } from "@/components";
import useContacts from "@/api/useContacts";
import useDeleteContact from "@/api/useDeleteContact";


function Home(){
  const {data, setKeyword, setPage, setFavorites} = useContacts();
  const {deleteContact, data:{loading:loadingDeleteContact}} = useDeleteContact();
  const {
    keyword,
    contacts,
    loading,
    page,
    totalPages,
    favorites,
  } = data;

  const deleteFromFavorite = (id:number|undefined) =>{
    setFavorites(prev => {
      const newArray = [...prev];
      const index = newArray.findIndex(el => el.id === id);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      return newArray;
    })
  }

  const onClickDelete = async(id:number|undefined, isFavorite=false) =>{
    if(!id|| loadingDeleteContact) return;
    await deleteContact(id);
    if(isFavorite) deleteFromFavorite(id);
  }
  
  return (
    <>
      <HomeSection direction="column" size={1.6}>
        <h2>Favorites</h2>
        <List>
          {
            favorites?.map((contact)=>(
              <ContactItem
                key={contact.id}
                data={contact}
                onClickContact={(id)=>console.log(id)}
                onClickDelete={()=> onClickDelete(contact.id, true)}
                onClickStar={()=> {
                  deleteFromFavorite(contact.id);
                }}
                isFavorite
              />
            ))
          }
        </List>
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
                onClickDelete={()=> onClickDelete(contact.id)}
                onClickStar={()=> {
                  setFavorites(prev=>[...prev, contact]);
                }}
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