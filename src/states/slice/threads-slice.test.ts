/* eslint-disable no-underscore-dangle */
/**
 * skenario test
 *- threads reducer
 *  - should handle initial state
 *  - should handle setThreads
 *  - should handle setStatus
 *
 * - getAllThreadsStateAsync thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { hideLoading } from 'react-redux-loading-bar';
import threadsReducer, {
  setThreads,
  setStatus,
  ThreadsState,
  getAllThreadsStateAsync,
} from './threads-slice.ts';
import threads from '../../services/threads.services.ts';
import { setToast } from './toast-slice.ts';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Failed to fetch threads data from the server');

describe('threads reducer', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { threads: threadsReducer } });
  });

  it('should handle initial state', () => {
    const expectedState: ThreadsState = {
      status: '',
      value: [],
    };
    expect(store.getState().threads).toEqual(expectedState);
  });

  it('should handle setThreads', () => {
    const threadsData = [
      {
        id: '1',
        title: 'Thread 1',
        body: 'This is thread 1',
        category: 'Category 1',
        createdAt: '2024-03-13T23:50:19.000Z',
        ownerId: 'owner1',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    store.dispatch(setThreads(threadsData));
    expect(store.getState().threads.value).toEqual(threadsData);
    expect(store.getState().threads.status).toEqual('success');
  });

  it('should handle setStatus', () => {
    store.dispatch(setStatus('loading'));
    expect(store.getState().threads.status).toEqual('loading');
  });
});

describe('getAllThreadsStateAsync thunk', () => {
  beforeEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    threads._getAll = threads.getAll;
  });

  afterEach(() => {
    // @ts-expect-error handle function _getAll not exist on api
    threads.getAll = threads._getAll;

    // delete backup data
    // @ts-expect-error handle function _getAll not exist on api
    delete threads._getAll;
  });

  // ... backup and restore

  it('should dispatch actions correctly when data fetching is successful', async () => {
    // Arrange
    // stub implementation
    threads.getAll = () => Promise.resolve({ status: 'success', data: { threads: fakeThreadsResponse } });

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // Act
    await getAllThreadsStateAsync()(dispatch, getState, extra);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setThreads(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly when data fetching fails', async () => {
    // arrange
    // stub implementation
    // eslint-disable-next-line prefer-promise-reject-errors
    threads.getAll = () => Promise.reject({ status: 'error', data: { message: fakeErrorResponse.message } });

    // mock dispatch
    const dispatch = vi.fn();
    const getState = vi.fn();
    const extra = vi.fn();

    // Act
    await getAllThreadsStateAsync()(dispatch, getState, extra);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setStatus('error'));
    expect(dispatch).toHaveBeenCalledWith(setToast({ status: 'error', message: fakeErrorResponse.message }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
