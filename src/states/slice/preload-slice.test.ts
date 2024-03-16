/**
 * skenario test
 *- preload reducer
 *  - should handle initial state
 *  - should handle setStatus action error
 *  - should handle setStatus action loading
 *  - should handle setUsers action success
 *
 * - getUserLoginAsync thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

/* eslint-disable no-underscore-dangle */
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { hideLoading } from 'react-redux-loading-bar';
import preloadReducer, {
  setPreload,
  setPreloadSuccess,
  setPreloadFailed,
  getUserLoginAsync,
  PreloadState,
} from './preload-slice.ts';
import users from '../../services/users.services.ts';
import { setAuthUser, unSetAuthUser } from './user-slice.ts';

const fakeUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Failed to fetch user data from the server');

describe('usersReducer', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { preload: preloadReducer } });
  });

  it('should handle initial state', () => {
    const initialState: PreloadState = {
      isPreload: true,
      isAuthenticated: false,
    };
    expect(store.getState().preload).toEqual(initialState);
  });

  it('setPreload action', () => {
    store.dispatch(setPreload());
    expect(store.getState().preload.isPreload).toBe(true);
    expect(store.getState().preload.isAuthenticated).toBe(false);
  });

  it('setPreloadFailed action', () => {
    store.dispatch(setPreloadFailed());
    expect(store.getState().preload.isPreload).toBe(false);
    expect(store.getState().preload.isAuthenticated).toBe(false);
  });

  it('setPreloadSuccess action', () => {
    store.dispatch(setPreloadSuccess());
    expect(store.getState().preload.isPreload).toBe(false);
    expect(store.getState().preload.isAuthenticated).toBe(true);
  });
});

describe('getUserLoginAsync thunk', () => {
  beforeEach(() => {
    // @ts-expect-error handle function _getOwnProfile not exist on api
    users._getOwnProfile = users.getOwnProfile;
  });

  afterEach(() => {
    // @ts-expect-error handle function _getOwnProfile not exist on api
    users.getOwnProfile = users._getOwnProfile;

    // delete backup data
    // @ts-expect-error handle function _getOwnProfile not exist on api
    delete users._getOwnProfile;
  });

  // ... backup and restore

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    users.getOwnProfile = () => Promise.resolve({ status: 'success', data: { user: fakeUserResponse } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getUserLoginAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setPreloadSuccess());
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    // eslint-disable-next-line prefer-promise-reject-errors
    users.getOwnProfile = () => Promise.reject({ status: 'error', data: { message: fakeErrorResponse.message } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getUserLoginAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unSetAuthUser());
    expect(dispatch).toHaveBeenCalledWith(setPreloadFailed());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
