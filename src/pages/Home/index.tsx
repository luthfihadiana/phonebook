import { useQuery } from "@apollo/client";
import { HomeSection, List, SearchContainer, SearchInput } from "./index.styles";
import { ContactItem } from "@/components";
import GET_CONTACTS from "@/Graphql/query/getContacts";
import { GetContactsResponseType } from "@/types";

function Home(){
  const {data} = useQuery<GetContactsResponseType>(GET_CONTACTS);
  return (
    <>
      <HomeSection direction="column" size={1.6}>
        <h2>Contact List</h2>
        <SearchContainer>
          <SearchInput placeholder="Search contact name ...."/>
        </SearchContainer>
        <List>
          {
            data?.contact?.map((contact)=>(
              <ContactItem
                data={contact}
                onClickContact={(id)=>console.log(id)}
                onClickDelete={(id)=> console.log('deleted',id)}
                onClickStar={(id)=> console.log('favorite',id)}
              />
            ))
          }
        </List>
      </HomeSection>
    </>
  );
}

export default Home;