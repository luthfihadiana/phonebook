import { Badge, HomeSection, SearchContainer, SearchInput } from "./index.styles";
import { BottomBar, ContactItem, Pagination, List} from "@/components";
import useContacts from "@/api/useContacts";
import useDeleteContact from "@/api/useDeleteContact";
import toast from "react-hot-toast";
import { ContactType } from "@/types";


function Home(){
  const {data, setKeyword, setPage, setFavorites, refetch:refetchContacts} = useContacts();
  const {deleteContact, data:{loading:loadingDeleteContact}} = useDeleteContact();
  const {
    keyword,
    contacts,
    loading,
    page,
    totalPages,
    favorites,
    totalItems,
  } = data;

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

  const onClickDelete = async(contact:ContactType, isFavorite=false) =>{
    const onSuccesDeleted = () =>{
      toast.error(`${contact.first_name} ${contact.last_name} have been deleted`);
    }
    const {id} = contact;
    if(!id|| loadingDeleteContact) return;
    await deleteContact(id, {
      onSuccess: onSuccesDeleted,
      onError: (e:Error) => toast.error(e.message),
    });
    if(isFavorite) deleteFromFavorite(contact, false);
    refetchContacts();
  }
  
  return (
    <>
      <HomeSection direction="column" size={1.6}>
        <h2>Favorites {favorites?.length && <Badge>{favorites?.length}</Badge>}</h2>
        <List loading={loading} isEmpty={favorites.length === 0}>
          {
            favorites?.map((contact)=>(
              <ContactItem
                key={contact.id}
                data={contact}
                onClickContact={(id)=>console.log(id)}
                onClickDelete={()=> onClickDelete(contact, true)}
                onClickStar={()=> {deleteFromFavorite(contact)}}
                isFavorite
              />
            ))
          }
        </List>
        <h2>Contact List {totalItems && <Badge>{totalItems}</Badge>}</h2>
        <SearchContainer>
          <SearchInput 
            placeholder="Search contact name ...."
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            disabled={loading}
          />
        </SearchContainer>
        <List loading={loading} isEmpty={!contacts?.length}>
          {
            contacts?.map((contact)=>(
              <ContactItem
                key={contact.id}
                data={contact}
                onClickContact={(id)=>console.log(id)}
                onClickDelete={()=> onClickDelete(contact)}
                onClickStar={()=> addToFavorite(contact)}
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