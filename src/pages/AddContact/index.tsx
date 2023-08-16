import { useNavigate } from "react-router-dom";
import { AddContactSection } from "./index.styles";
import { ContactForm } from "@/components";
import { ContactFormDataType } from "@/types";
import useAddContact from "@/api/useAddContact";
import toast from "react-hot-toast";

function AddContact(){
  const navigate = useNavigate();

  const {addContact, data: {loading}} = useAddContact();

  const onSuccess = (data: ContactFormDataType) =>{
    toast.success(`${data.firstName} ${data.lastName} have been added`);
    navigate('/');
  }

  const onSubmitData = async (data: ContactFormDataType) =>{
    await addContact(data, {
      onSuccess: () => onSuccess(data),
      onError: (e:Error) => toast.error(e.message)
    });
  }

  return (
    <AddContactSection direction="column" size={3.2}>
      <h2>
        Add Contact
      </h2>
      <ContactForm
        loading={loading}
        onSubmitData={onSubmitData}
      />
    </AddContactSection>
  );
}

export default AddContact;