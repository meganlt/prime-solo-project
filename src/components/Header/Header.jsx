import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';

function Header() {
  
  const [ hook, setHook ] = useState( '' );

  return (
    <header>
            <h1>BorrowBurrow</h1>
            <Nav />
    </header>
  );
}


export default Header;