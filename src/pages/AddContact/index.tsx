import { Button, Spacer } from "@/styles";
import {useFieldArray, useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { InputNameContainers,StyledInput, AddContactSection, AddNumberContainer, PhoneNumberInputContainer, SubmitButton} from "./index.styles";
import AddContactSchema from './schema';
import { BottomBar, Controller, Icons } from "@/components";
import { AddContactSchemaDataType, CheckContactType } from "@/types";
import useAddContact from "@/api/useAddContact";

function AddContact(){
  const navigate = useNavigate();

  const {addContact, data: {loading}} = useAddContact();

  const { handleSubmit, control, setError } = useForm<AddContactSchemaDataType>({
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

  const onSuccess = () =>{
    navigate('/');
  }

  const onSubmit = async (data: AddContactSchemaDataType) =>{
    try{
      await addContact(data, onSuccess);
    }catch(e: unknown){
      if(e instanceof Error){
        console.error("error",e);
      }else{
        const nonUniqueData = e as CheckContactType;
        if(nonUniqueData?.name){
          setError("firstName", {message: 'Please select different name'});
          setError("lastName", {message: 'Please select different name'});
        }
        if(nonUniqueData?.phoneNumbers){
          let i = 0;
          for(const phoneNumber of data.phoneNumbers){
            if(phoneNumber.number in nonUniqueData.phoneNumbers){
              setError(`phoneNumbers.${i}.number`,{message: "Please select different number"})
            }
            i++;
          }
        }
      }
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
            <PhoneNumberInputContainer direction="row" size={0.8} key={field.id}>
              <Controller
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