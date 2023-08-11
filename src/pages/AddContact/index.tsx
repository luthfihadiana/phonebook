import { Button, Spacer } from "@/styles";
import {useFieldArray, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputNameContainers,StyledInput, AddContactSection, AddNumberContainer, PhoneNumberInputContainer, SubmitButtonContainer, SubmitButtonContent } from "./index.styles";
import AddContactSchema, {AddContactSchemaData} from './schema';
import { Controller, Icons } from "@/components";

function AddContact(){
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

  const onSubmit = (data: AddContactSchemaData) =>{
    console.log(data);
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
              >
                <StyledInput type="text" placeholder="Fill phone number ..."/>
              </Controller>
              <div>
                <Button 
                  colorScheme="danger" 
                  onClick={()=> remove(index)}
                  disabled={fields.length<=1}
                >
                  <Icons name="delete" color="white"/>
                </Button>
              </div>
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
      <SubmitButtonContainer>
        <SubmitButtonContent>
          <Button
            colorScheme="success"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </SubmitButtonContent>
      </SubmitButtonContainer>
    </AddContactSection>
  );
}

export default AddContact;