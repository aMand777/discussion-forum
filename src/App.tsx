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
import { getLeaderBoardsAsync } from './states/slice/leaderboards-slice';
import NotFoundPage from './components/notFound/NotFoundPage';
import DetailThread from './pages/DetailThread';
import Create from './pages/Create';
import Toast from './components/toast/Toast';
import LeaderBoards from './pages/LeaderBoards';
import PostsProfile from './pages/PostsProfile';
import UpVotesProfile from './pages/UpVotesProfile';
import DownVotesProfile from './pages/DownVotesProfile';
import Categories from './pages/Categories';
import Votes from './pages/Votes';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUserLoginAsync());
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
            <Route path='/thread/:threadId' element={<Votes />} />
            <Route path='/leaderboards' element={<LeaderBoards />} />
            <Route path='/threads/categories/:category' element={<Categories />} />
            <Route path='/:user/:userId/profile' element={<PostsProfile />} />
            <Route path='/:user/:userId/upvotes' element={<UpVotesProfile />} />
            <Route path='/:user/:userId/downvotes' element={<DownVotesProfile />} />
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
