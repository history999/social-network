import './App.scss';
import { Navigate, Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./components/Profile/Profile"
import Prices from "./components/Prices/Prices"
import Users from './components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs';
import Messages from './components/Dialogs/Messages';
import Login from './components/Login';
import Chat from './components/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setDataAuthThunk } from './redux/app-reducer';
import { HourGlass } from 'react-awesome-spinners';




function App() {
  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setDataAuthThunk())
  }, [dispatch])

  const isAuth = useSelector((state) => state.authReducer.isAuth)
  const initialize = useSelector((state) => state.appReducer.initialize)
  
  if (!initialize) {
    return <HourGlass />
  }

  return (

    <div className="App">

      <HeaderContainer className="header" />

      {!isAuth ?
        <Login className="login" />
        :
        <div className='AppStyle'>
          <Navbar className="navbar" />
          <Routes>
            <Route path="/profile" element={<Profile className="profile" />}>
              <Route index element={<Profile className="profile" />}></Route>
              <Route path=":userId" element={<Profile className="profile" />}></Route>
            </Route>
            <Route path="/prices" element={<Prices className="prices" />}></Route>
            <Route path="/users" element={<Users className="users" />}></Route>
            <Route path="/chat" element={<Chat className="chat" />}></Route>
            <Route path="/dialogs" element={<Dialogs className="dialogs" />}></Route>
            <Route path="/dialogs/:userIdDialog/messages" element={<Messages className="dialogs" />}></Route>
          </Routes>
        </div>}

    </div>

  );

}

export default App;
