import './App.scss';
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer"
import Navbar from "./components/Navbar/Navbar"
import ProfileContainer from "./components/Profile/ProfileContainer"
import Prices from "./components/Prices/Prices"
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login';

function App() {
  return (

    <div className="App">
      <HeaderContainer className="header" />
      <div className='AppStyle'>
        <Navbar className="navbar" />
        <Routes>
          <Route path="/profile/:userId" element={<ProfileContainer className="profile" />} ></Route>
          <Route path="/prices" element={<Prices className="prices" />}></Route>
          <Route path="/users" element={<UsersContainer className="users" />}></Route>
          <Route path="/Login" element={<Login className="login" />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
