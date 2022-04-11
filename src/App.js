import './App.css';
import RegisterForm from './components/register/register';
import LoginForm from './components/login/LoginForm';
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ErrorPage from './components/error/Error';
import { UserContext } from './UserContext';
import ProtectedRoutes from './ProtectedRoutes';
import Posts from './components/posts/Posts';

function App() {
  // const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // const toggleLoginState = (event) => {
  //   setIsLogin(!isLogin);
  //   console.log("Toggled");
  // }
  return (
    <Router>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route element={<ProtectedRoutes />}>
          
            <Route path='/posts' element={<Posts />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>

      </UserContext.Provider>

    </Router>
  )

  // return (
  //   <div className="App">
  //     {isLogin?<LoginForm/>:<RegisterForm/>}
  //     <div onClick={toggleLoginState}>{isLogin?`Don't have an account yet? Signup`:`Already have an account? Login`}</div>
  //   </div>
  // );
}

export default App;
