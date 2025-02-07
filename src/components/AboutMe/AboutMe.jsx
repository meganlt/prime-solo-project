import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function AboutMe() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <>
      <h1>AboutMe</h1>
    </>
  );
}


export default AboutMe;