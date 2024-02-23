import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import RequireAuth from './components/routes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './states/store';
import { getUserLoginAsync } from './states/slice/authUser-slice';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getUserLoginAsync());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* public route */}
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          {/* private route */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<h1>Halaman Home</h1>} />
            {/* <Route path='/' element={<Notes />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/notes/create' element={<Create />} />
            <Route path='/notes/archived' element={<Archived />} />
            <Route path='/notes/detail/:id' element={<Detail />} /> */}
          </Route>
          {/* not found route page */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
