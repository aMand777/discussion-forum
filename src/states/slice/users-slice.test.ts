/**
 * skenario test
 *- users reducer
 *  - should handle initial state
 *  - should handle setStatus action error
 *  - should handle setStatus action loading
 *  - should handle setUsers action success
 *
 * - getAllUsersAsync thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

/* eslint-disable no-underscore-dangle */
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import usersReducer, { getAllUsersAsync, setUsers, setStatus, UsersState } from './users-slice.ts';
import users from '../../services/users.services.ts';
import { setToast } from './toast-slice.ts';

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Failed to fetch user data from the server');

describe('usersReducer', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { users: usersReducer } });
  });

  it('should handle initial state', () => {
    const initialState: UsersState = {
      status: '',
      users: [],
    };
    expect(store.getState().users).toEqual(initialState);
  });

  it('setStatus action error', () => {
    store.dispatch(setStatus('error'));
    expect(store.getState().users.status).toBe('error');
    expect(store.getState().users.users).toStrictEqual([]);
  });

  it('setStatus action loading', () => {
    store.dispatch(setStatus('loading'));
    expect(store.getState().users.status).toBe('loading');
    expect(store.getState().users.users).toStrictEqual([]);
  });

  it('setUsers action success', () => {
    const usersData = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    store.dispatch(setUsers(usersData));
    expect(store.getState().users.status).toBe('success');
    expect(store.getState().users.users).toEqual(usersData);
  });
});

describe('getAllUsersAsync thunk', () => {
  beforeEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    users._getAll = users.getAll;
  });

  afterEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    users.getAll = users._getAll;

    // delete backup data
    // @ts-expect-error handle function _getAll not exist on api
    delete users._getAll;
  });

  // ... backup and restore

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    users.getAll = () => Promise.resolve({ status: 'success', data: { users: fakeUsersResponse } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getAllUsersAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setUsers(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    // eslint-disable-next-line prefer-promise-reject-errors
    users.getAll = () => Promise.reject({ status: 'error', data: { message: fakeErrorResponse.message } });
    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // action
    await getAllUsersAsync()(dispatch, getState, extra);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setStatus('error'));
    expect(dispatch).toHaveBeenCalledWith(
      setToast({ status: 'error', message: fakeErrorResponse.message }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
