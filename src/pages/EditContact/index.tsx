import { useNavigate, useParams } from "react-router-dom";
import { EditContactSection } from "./index.styles";
import { ContactForm, LoadingIndicator } from "@/components";
import { ContactFormDataType } from "@/types";
import toast from "react-hot-toast";
import useContact from "@/api/useContact";
import { useEffect, useMemo, useState } from "react";
import { Button, Spacer } from "@/styles";
import useUpdateContact from "@/api/useUpdateContact";
import Modal from "@/components/Modal";
import debounce from "lodash.debounce";

function EditContact(){
  const navigate = useNavigate();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);

  const {data:{loading:loadingGetContact, contact}, refetch} = useContact({
    onDemand:false, 
    id: params.id && !isNaN(parseInt(params.id)) ? parseInt(params.id) : -1
  });

  const {updateContact, data: {loading}} = useUpdateContact();

  const prefillData = useMemo(()=>({
    firstName: contact?.first_name|| '',
    lastName: contact?.last_name || '',
    phoneNumbers: contact?.phones || [{number:''}],
  }),[contact]);

  useEffect(()=>{
    const deb = debounce(()=>{
      if(!params.id || isNaN(parseInt(params.id))){
        toast.error('Not valid contact id');
        navigate('/',{replace:true});

      }else{
        if(!loadingGetContact && !contact){
          toast.error('Contact not found');
          navigate('/',{replace: true});
        }
      }
    },100);

    deb();

    return () => {
      deb.cancel();
    }
  },[loadingGetContact, contact, navigate, params]);

  const onSuccess = () =>{
    toast.success(`Contact have been edited`);
    setIsEdit(false);
    refetch();
  }

  const onSubmitData = async (data: ContactFormDataType) =>{
    await updateContact(
      {
        data,
        idParams: params.id,
        handler: {
          onSuccess: () => onSuccess(),
          onError: (e:Error) => toast.error(e.message)
        },
        oldData: contact || {},
      }
    );
  }

  const onClickEdit = () => {
    if(!isEdit){
      setIsEdit(!isEdit)
    }else{
      setShow(true)
    }
  }

  return (
    <>
      <EditContactSection direction="column" size={3.2}>
        <Spacer direction="row" justify="space-between">
          <h2>
            {!isEdit ? 'Detail Contact' : 'Edit Contact'}
          </h2>
          <Button 
            colorScheme={isEdit ? "danger" : "primary"}
            onClick={onClickEdit}
          >
            {!isEdit ? 'Edit Contact': 'Cancel Edit'}
          </Button>
        </Spacer>
        {
          loadingGetContact 
            ? <LoadingIndicator/> 
            : (
              <ContactForm
                loading={loading}
                onSubmitData={onSubmitData}
                viewOnly={!isEdit}
                prefillData={prefillData}
              />
            ) 
        }
      </EditContactSection>
      <Modal 
        visible={show} 
        title="Cancel Edit Contact"
        onOk={()=> {
          setIsEdit(false);
          setShow(false);
        }}
        onCancel={() => setShow(false)}
        description="Are you cancel edit contact ?"
      />
    </>
  );
}

export default EditContact;