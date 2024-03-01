import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postNewThreadAsync } from '../states/slice/create-slice';
import { useAppDispatch, useAppSelector } from '../states/store';
import { useNavigate } from 'react-router-dom';
import { unSetResponse } from '../states/slice/create-slice';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const toolbarOptions = [
    [
      'bold',
      'italic',
      'underline',
      { header: [1, 2, 3, 4, 5, 6, false] },
      { list: 'ordered' },
      'link',
      'code-block',
      { align: [] },
      { color: [] },
    ],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const { status } = useAppSelector((state) => state.create);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postNewThreadAsync({ title, category, body }));
    if (status === 'success') {
      navigate('/');
    }
    dispatch(unSetResponse());
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-11/12 lg:w-10/12 mx-auto -mt-24'>
          <h1 className='text-xl font-semibold text-center'>Create New Thread</h1>
          <label className='w-full form-control'>
            <div className='label'>
              <span className='label-text'>Title</span>
            </div>
            <input
              type='text'
              placeholder='Type something . .'
              className='w-full input input-bordered'
              value={title}
              onChange={handleChangeTitle}
            />
            <div className='label'></div>
          </label>
          <label className='w-full form-control'>
            <div className='label'>
              <span className='label-text'>Category</span>
            </div>
            <input
              type='text'
              placeholder='Type something . .'
              className='w-full input input-bordered'
              value={category}
              onChange={handleChangeCategory}
            />
            <div className='label'></div>
          </label>
          <div className='w-full form-control'>
            <div className='label'>
              <label className='label-text'>Description</label>
            </div>
            <ReactQuill
              className='h-24'
              modules={module}
              theme='snow'
              value={body}
              onChange={setBody}
            />
            <div className='label'></div>
            <button type='submit' className='btn btn-outline btn-accent mt-10 ml-auto mr-0 px-10'>
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;