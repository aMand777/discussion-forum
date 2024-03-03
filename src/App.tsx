import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import RequireAuth from './components/routes/RequireAuth';
import Login from './pages/Login';
import Threads from './pages/Threads';
import Register from './pages/Register';
import { useAppDispatch } from './states/store';
import { getUserLoginAsync } from './states/slice/preload-slice';
import { getAllThreadsStateAsync } from './states/slice/threads-slice';
import { getLeaderBoardsAsync } from './states/slice/leaderboards-slice';
import NotFoundPage from './components/notFound/NotFoundPage';
import DetailThread from './pages/DetailThread';
import Create from './pages/Create';
import Toast from './components/toast/Toast';
import LeaderBoards from './pages/LeaderBoards';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUserLoginAsync());
    dispatch(getAllThreadsStateAsync());
    dispatch(getLeaderBoardsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        {/* public route */}
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        {/* private route */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Threads />} />
            <Route path='/threads/create' element={<Create />} />
            <Route path='/leaderboards' element={<LeaderBoards />} />
            <Route path='/threads/:user/:threadId' element={<DetailThread />} />
          </Route>
          {/* not found route page */}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
