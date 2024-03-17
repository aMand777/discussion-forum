/**
 * skenario test
 *- leaderboards reducer
 *  - should handle initial state
 *  - should handle setStatus action error
 *  - should handle setStatus action loading
 *  - should handle setUsers action success
 *
 * - getLeaderBoardsAsync thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

/* eslint-disable no-underscore-dangle */
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { hideLoading } from 'react-redux-loading-bar';
import leaderBoardReducer, { getLeaderBoardsAsync, setLeaderBoards, setStatus, LeaderBoardState } from './leaderboards-slice.ts';
import leaderboards from '../../services/leaderboards.services.ts';
import { setToast } from './toast-slice.ts';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Failed to fetch leaderboards data from the server');

describe('usersReducer', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { leaderboards: leaderBoardReducer } });
  });

  it('should handle initial state', () => {
    const initialState: LeaderBoardState = {
      status: '',
      value: [],
    };
    expect(store.getState().leaderboards).toEqual(initialState);
  });

  it('setStatus action error', () => {
    store.dispatch(setStatus('error'));
    expect(store.getState().leaderboards.status).toBe('error');
    expect(store.getState().leaderboards.value).toStrictEqual([]);
  });

  it('setStatus action loading', () => {
    store.dispatch(setStatus('loading'));
    expect(store.getState().leaderboards.status).toBe('loading');
    expect(store.getState().leaderboards.value).toStrictEqual([]);
  });

  it('setLeaderBoards action success', () => {
    const leaderboardsData = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ];

    store.dispatch(setLeaderBoards(leaderboardsData));
    expect(store.getState().leaderboards.status).toBe('success');
    expect(store.getState().leaderboards.value).toEqual(leaderboardsData);
  });
});

describe('getLeaderBoardsAsync thunk', () => {
  beforeEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    leaderboards._getAll = leaderboards.getAll;
  });

  afterEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    leaderboards.getAll = leaderboards._getAll;

    // delete backup data
    // @ts-expect-error handle function _getAll not exist on api
    delete leaderboards._getAll;
  });

  // ... backup and restore

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    leaderboards.getAll = () => Promise.resolve({ status: 'success', data: { leaderboards: fakeLeaderboardsResponse } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getLeaderBoardsAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setLeaderBoards(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    // eslint-disable-next-line prefer-promise-reject-errors
    leaderboards.getAll = () => Promise.reject({ status: 'error', data: { message: fakeErrorResponse.message } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getLeaderBoardsAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setStatus('error'));
    expect(dispatch).toHaveBeenCalledWith(
      setToast({ status: 'error', message: fakeErrorResponse.message }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
