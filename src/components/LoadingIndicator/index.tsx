import { Loading, Spinner } from "./index.styles";

function LoadingIndicator(){
  return(
    <Loading>
      <Spinner>
        <figure>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </figure>
      </Spinner>
    </Loading>
  );
}

export default LoadingIndicator;