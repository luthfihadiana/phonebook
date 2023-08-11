import { HomeSection, List, SearchContainer, SearchInput } from "./index.styles";
import { ContactItem } from "@/components";

function Home(){
  return (
    <>
      <HomeSection direction="column" size={1.6}>
        <h2>Contact List</h2>
        <SearchContainer>
          <SearchInput placeholder="Search contact name ...."/>
        </SearchContainer>
        <List>
          <ContactItem
            data={
              {
                name:"Name",
                phoneNumber:"08516782820",
                id:'1'
              }
            }
            onClickContact={(id)=>console.log(id)}
            onClickDelete={(id)=> console.log('deleted',id)}
            onClickStar={(id)=> console.log('favorite',id)}
          />
        </List>
      </HomeSection>
    </>
  );
}

export default Home;