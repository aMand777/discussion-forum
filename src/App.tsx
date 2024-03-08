import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout.tsx';
import RequireAuth from './components/routes/RequireAuth.tsx';
import Login from './pages/Login.tsx';
import Threads from './pages/Threads.tsx';
import Register from './pages/Register.tsx';
import { useAppDispatch } from './states/store.ts';
import { getUserLoginAsync } from './states/slice/preload-slice.ts';
import { getLeaderBoardsAsync } from './states/slice/leaderboards-slice.ts';
import NotFoundPage from './components/notFound/NotFoundPage.tsx';
import DetailThread from './pages/DetailThread.tsx';
import Create from './pages/Create.tsx';
import Toast from './components/toast/Toast.tsx';
import LeaderBoards from './pages/LeaderBoards.tsx';
import PostsProfile from './pages/PostsProfile.tsx';
import UpVotesProfile from './pages/UpVotesProfile.tsx';
import DownVotesProfile from './pages/DownVotesProfile.tsx';
import Categories from './pages/Categories.tsx';
import UpVotesThreadBy from './pages/UpVotesThreadBy.tsx';
import UpVotesCommentBy from './pages/UpVotesCommentBy.tsx';
import DownVotesCommentBy from './pages/DownVotesCommentBy.tsx';
import DownVotesThreadBy from './pages/DownVotesThreadBy.tsx';
import Users from './pages/Users.tsx';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUserLoginAsync());
    dispatch(getLeaderBoardsAsync());
  }, []);

  return (
    <>
      <Routes>
        {/* public route */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* private route */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Threads />} />
            <Route path="/threads/create" element={<Create />} />
            <Route path="/:threadId/upvotes_by" element={<UpVotesThreadBy />} />
            <Route
              path="/:threadId/downvotes_by"
              element={<DownVotesThreadBy />}
            />
            <Route
              path="/:threadId/:commentId/upvotes_by"
              element={<UpVotesCommentBy />}
            />
            <Route
              path="/:threadId/:commentId/downvotes_by"
              element={<DownVotesCommentBy />}
            />
            <Route path="/leaderboards" element={<LeaderBoards />} />
            <Route path="/users/:username" element={<Users />} />
            <Route
              path="/threads/categories/:category"
              element={<Categories />}
            />
            <Route path="/:user/:userId/profile" element={<PostsProfile />} />
            <Route path="/:user/:userId/upvotes" element={<UpVotesProfile />} />
            <Route
              path="/:user/:userId/downvotes"
              element={<DownVotesProfile />}
            />
            <Route path="/threads/:user/:threadId" element={<DetailThread />} />
          </Route>
          {/* not found route page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
