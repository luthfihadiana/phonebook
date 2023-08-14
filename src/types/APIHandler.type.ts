type APIHandler = {
  onSuccess: () => void,
  onError: (e:Error) => void 
}

export default APIHandler;