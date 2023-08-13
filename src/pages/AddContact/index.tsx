import { Button, Spacer } from "@/styles";
import {useFieldArray, useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { InputNameContainers,StyledInput, AddContactSection, AddNumberContainer, PhoneNumberInputContainer, SubmitButton} from "./index.styles";
import AddContactSchema, {AddContactSchemaData} from './schema';
import { BottomBar, Controller, Icons } from "@/components";
import { useMutation } from "@apollo/client";
import ADD_CONTACT from "@/Graphql/mutation/addContact";
import { AddContactResponseType, AddContactRequestType } from "@/types";

function AddContact(){
  const navigate = useNavigate();

  const [AddContactMutation, {loading}] = useMutation<AddContactResponseType, AddContactRequestType>(
    ADD_CONTACT
  );

  const { handleSubmit, control } = useForm<AddContactSchemaData>({
    resolver: yupResolver(AddContactSchema),
    defaultValues:{
      firstName: '',
      lastName: '',
      phoneNumbers:[{number:''}]
    },
  });

  const {fields ,append, remove} = useFieldArray({
    name: 'phoneNumbers',
    control,
  });

  const onSubmit = async (data: AddContactSchemaData) =>{
    try{
      await AddContactMutation({
        variables: {
          data:{
            first_name: data?.firstName,
            last_name: data?.lastName,
            phones: {
              data: data?.phoneNumbers.map(phoneNumber => ({number: phoneNumber.number}))
            }
          }
        }
      })
      navigate('/');
    }catch(e){
      console.log('error',e);
    }
  }

  return (
    <AddContactSection direction="column" size={3.2}>
      <h2>
        Add Contact
      </h2>
      <InputNameContainers>
        <Controller 
          control={control}
          name="firstName" 
          label="First Name"
        >
          <StyledInput type="text" placeholder="Fill First Name ...."/>
        </Controller>
        <Controller 
          control={control}
          name="lastName" 
          label="Last Name"
        >
          <StyledInput type="text" placeholder="Fill Last Name ...."/>
        </Controller>
      </InputNameContainers>
      <Spacer direction="column" size={1.6}>
        {
          fields.map((field, index)=>
            <PhoneNumberInputContainer direction="row" size={0.8}>
              <Controller
                key={field.id} 
                control={control}
                name={`phoneNumbers.${index}.number`}
                label={`Phone Number ${index+1}`}
                suffixElement={
                  <Button 
                    colorScheme="danger" 
                    onClick={()=> remove(index)}
                    disabled={fields.length<=1}
                  >
                    <Icons name="delete" color="white"/>
                  </Button>
                }
              >
                <StyledInput type="text" placeholder="Fill phone number ..."/>
              </Controller>
            </PhoneNumberInputContainer>
          )
        }
        <Button onClick={()=> append({number:''})}>
          <Icons name="add" color="white"/>
          Add Number
        </Button>
        <AddNumberContainer>
        </AddNumberContainer>
      </Spacer>
      <BottomBar>
        <SubmitButton
          colorScheme="success"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Submit
        </SubmitButton>
      </BottomBar>
    </AddContactSection>
  );
}

export default AddContact;