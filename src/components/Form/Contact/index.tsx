import { Button, Spacer } from "@/styles";
import {useFieldArray, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputNameContainers,StyledInput, AddNumberContainer, PhoneNumberInputContainer, SubmitButton} from "./index.styles";
import ContactFormSchema from './schema';
import { BottomBar, Controller, Icons } from "@/components";
import { ContactFormDataType, CheckContactType } from "@/types";
import toast from "react-hot-toast";
import { useEffect } from "react";

type ContactFormPropType = {
  onSubmitData: (data:ContactFormDataType) => Promise<void>,
  loading:boolean,
  viewOnly?: boolean,
  prefillData?: ContactFormDataType | null,
};

function ContactForm({
  onSubmitData,
  loading,
  viewOnly=false,
  prefillData=null
}:ContactFormPropType){
  const { 
    formState:{isDirty},
    handleSubmit, 
    control, 
    setError, 
    reset 
  } = useForm<ContactFormDataType>({
    resolver: yupResolver(ContactFormSchema),
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

  useEffect(()=>{
    if(!prefillData) return;
    reset(prefillData);
  },[reset, prefillData, viewOnly]);
  
  const onSubmit = async (data: ContactFormDataType) =>{
    try{
      await onSubmitData(data);
    }catch(e: unknown){
      if(e instanceof Error){
        toast.error((e).message || String(e));
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
    <>
      <InputNameContainers>
        <Controller 
          control={control}
          name="firstName" 
          label="First Name"
        >
          <StyledInput type="text" placeholder="Fill First Name ...." disabled={viewOnly}/>
        </Controller>
        <Controller 
          control={control}
          name="lastName" 
          label="Last Name"
        >
          <StyledInput type="text" placeholder="Fill Last Name ...." disabled={viewOnly}/>
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
                  !viewOnly ? <Button 
                    colorScheme="danger" 
                    onClick={()=> remove(index)}
                    disabled={fields.length<=1}
                  >
                    <Icons name="delete" color="white"/>
                  </Button> : null
                }
              >
                <StyledInput type="text" placeholder="Fill phone number ..." disabled={viewOnly}/>
              </Controller>
            </PhoneNumberInputContainer>
          )
        }
        {!viewOnly && <Button onClick={()=> append({number:''})}>
          <Icons name="add" color="white"/>
          Add Number
        </Button>}
        <AddNumberContainer>
        </AddNumberContainer>
      </Spacer>
      {!viewOnly && <BottomBar>
        <SubmitButton
          colorScheme="success"
          onClick={handleSubmit(onSubmit)}
          disabled={loading||!isDirty}
        >
          Submit
        </SubmitButton>
      </BottomBar>}
    </>
  );

}

export default ContactForm;