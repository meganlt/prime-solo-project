import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import useStore from '../../zustand/store';

import Header from '../Header/Header';
import MyDen from '../MyDen/MyDen';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyTrinkets from '../MyTrinkets/MyTrinkets';
import MyForest from '../MyForest/MyForest';
import AboutMe from '../AboutMe/AboutMe';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state)=>state.isUserLoading);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading){
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />
      
      <main>
        <Routes>
          <Route 
              exact path="/"
              element={
                user.id ? (
                  <MyDen /> // Render HomePage for authenticated user.
                ) : (
                  <Navigate to="/login" replace /> // Redirect unauthenticated user.
                )
              }
            />
          <Route 
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/mytrinkets"
            element={
              user.id ? (
                <MyTrinkets /> // Render MyTrinkets for authenticated user.
              ) : (
                <Navigate to="/" replace /> // Redirect unauthenticated user.
              )
            } 
          />
          <Route 
            exact path="/myforest"
            element={
              user.id ? (
                <MyForest /> // Render MyForest for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            } 
          />
          <Route 
            exact path="/aboutme"
            element={
              user.id ? (
                <AboutMe /> // Render AboutMe for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            } 
          />
          
          <Route
            path="*"
            element={
              <ErrorPage/>
            } 
          />
        </Routes>
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}


export default App;
