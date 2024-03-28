import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { postNewThreadAsync, unSetResponse } from '../states/slice/create-slice.ts';
import { useAppDispatch, useAppSelector } from '../states/store.ts';
import Button from '../components/button/Button.tsx';

function Create() {
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
  };

  React.useEffect(() => {
    if (status === 'success') {
      dispatch(unSetResponse());
      navigate('/');
    }
  }, [dispatch, status, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-screen"
    >
      <div className="w-11/12 mx-auto -mt-24 lg:w-10/12">
        <h1 className="text-xl font-semibold text-center">Create New Thread</h1>
        <label htmlFor="title" className="w-full form-control">
          <div className="label">
            <span className="label-text">
              Title
              <span className="text-error">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder="What are you thinking about?"
            className="w-full input input-bordered"
            value={title}
            onChange={handleChangeTitle}
          />
          <div className="label" />
        </label>
        <label htmlFor="category" className="w-full form-control">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <input
            type="text"
            placeholder="Search easier with category"
            className="w-full input input-bordered"
            value={category}
            onChange={handleChangeCategory}
          />
          <div className="label" />
        </label>
        <div className="w-full form-control">
          <div className="label">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="label-text">
              Content
              <span className="text-error">*</span>
            </label>
          </div>
          <ReactQuill
            className="h-24"
            modules={module}
            theme="snow"
            value={body}
            onChange={setBody}
          />
          <div className="label" />
          <Button outline status={status} color="btn-accent">
            Post Thread
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Create;
