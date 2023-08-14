import {Toaster as RHTToaster} from 'react-hot-toast';

function Toaster(){
  return(
    <RHTToaster
      toastOptions={{
        style:{
          background: '#3eb3ed',
          color:'white',
        },
        success: {
          style: {
            background: 'green',
            color: 'white',
          },
        },
        error: {
          style: {
            background: 'red',
            color: 'white',
          },
        },
      }}
    />
  );
}

export default Toaster;