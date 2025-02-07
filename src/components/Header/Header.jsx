import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';

function Header() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <header>
            <h1>Prime Solo Project</h1>
            <Nav />
    </header>
  );
}


export default Header;