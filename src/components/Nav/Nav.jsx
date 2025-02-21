import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';


function Nav() {
  const user = useStore((store) => store.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <nav>
      <ul>
      { // User is not logged in, render these links:
        !user.id && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
          </>
        )
      }
      { // User is logged in, render these links:
        user.id && (
          <>
            <li>
              <NavLink to="/">My Den</NavLink>
            </li>
            <li>
              <NavLink to="/mytrinkets">My Trinkets</NavLink>
            </li>
            <li>
              <NavLink to="/myforest">My Forest</NavLink>
            </li>
            <li>
              <NavLink to="/aboutme"><img src={user.avatar} width="40px"/>{user.username} <span className="material-symbols-outlined">settings</span></NavLink>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <a className="logout" onClick={logOut}>Log Out<span className="material-symbols-outlined">logout</span></a>
            </li>
          </>
        )
      }
      </ul>
    </nav>
  );
}


export default Nav;
