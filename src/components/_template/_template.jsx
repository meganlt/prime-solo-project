import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function _template() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <>
      <h1>_template</h1>
    </>
  );
}


export default _template;