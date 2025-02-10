import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function ErrorPage() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <>
      <h1>404 ErrorPage</h1>
    </>
  );
}


export default ErrorPage;