import { useMemo, useState } from "react";

type UseModalParams<T,E extends string> = {
  config:{
    submitAction: Partial<Record<E,((input:T)=>void) | (()=>void)>>,
    title: Partial<Record<E, string | ((input:T)=>string)>>,
    desc: Partial<Record<E, string | ((input:T)=>string)>>,
  }
}

function useModal<T, E extends string>({
  config:{
    submitAction = {},
    title:titleConfig={},
    desc:descriptionConfig={},
  }
}:UseModalParams<T, E>){
  const[selectData, setSelectData] = useState<T|null>(null);
  const[type, setType] = useState<E|null>()

  const description = useMemo(()=>{
    if(!type) return '';
    const descriptionString = descriptionConfig[type];
    if(!descriptionString) return '';
    if(typeof descriptionString === 'string'){
      return descriptionString;
    }
    return selectData ? descriptionString(selectData) : '';
  },[type, selectData, descriptionConfig]);

  const title = useMemo(()=>{
    if(!type) return '';
    const titleString = titleConfig[type];
    if(!titleString) return '';
    if(typeof titleString === 'string') return titleString;
    return selectData ? titleString(selectData) : '';
  },[type, selectData, titleConfig]);

  const onCancel = () =>{
    setSelectData(null);
    setType(null);
  }

  const onSelectData = (data:T, modalType:E) => {
    setSelectData(data);
    setType(modalType);
  }

  const onSubmit = () =>{
    if(!type || !selectData) return;
    const action = submitAction[type];
    if(action) action(selectData);
    setSelectData(null);
    setType(null);
  }

  return{
    visible: !!selectData,
    onCancel,
    title,
    description,
    onSelectData,
    onSubmit,
  }
}

export default useModal;