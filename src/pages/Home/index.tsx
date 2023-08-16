import { useNavigate } from "react-router-dom";
import { Badge, HomeSection, SearchContainer, SearchInput } from "./index.styles";
import { BottomBar, ContactItem, Pagination, List} from "@/components";
import useContacts from "@/api/useContacts";
import { HomeModalEnum } from "@/types";
import Modal from "@/components/Modal";
import useModalHome from "./useModalHome";


function Home(){
  const navigate = useNavigate();

  const {data, setKeyword, setPage, setFavorites, refetch:refetchContacts} = useContacts();

  const {
    keyword,
    contacts,
    loading,
    page,
    totalPages,
    favorites,
    totalItems,
  } = data;

  const {
    onSelectData,
    visible,
    title,
    description,
    onCancel,
    onSubmit,
  } = useModalHome({setFavorites, refetchContacts});
  
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
                onClickContact={()=> navigate(`/edit-contact/${contact.id}`)}
                onClickDelete={()=> onSelectData(contact, HomeModalEnum.Delete)}
                onClickStar={()=> onSelectData(contact, HomeModalEnum.RemoveFavorite)}
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
                onClickContact={()=> navigate(`/edit-contact/${contact.id}`)}
                onClickDelete={()=> onSelectData(contact, HomeModalEnum.Delete)}
                onClickStar={()=> onSelectData(contact, HomeModalEnum.Favorite)}
              />
            ))
          }
        </List>
      </HomeSection>
      <Modal 
        visible={visible} 
        title={title}
        onOk={onSubmit}
        onCancel={onCancel}
        description={description}
      />
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