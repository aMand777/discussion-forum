import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useUser from '../../hook/useUser';
import { postNewCommentAsync } from '../../states/slice/create-slice';
import { useAppDispatch, useAppSelector } from '../../states/store';
import { unSetResponse } from '../../states/slice/create-slice';
import { Link } from 'react-router-dom'

type EditorProps = {
  threadId: string;
};
const Editor: React.FC<EditorProps> = ({ threadId }) => {
  const dispatch = useAppDispatch();
  const { authUser } = useUser();
  const [content, setContent] = React.useState<string>('');

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

  const { status } = useAppSelector((state) => state.create);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postNewCommentAsync({ content, threadId }));
    if (status === 'success') {
      setContent('');
      dispatch(unSetResponse());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='items-center gap-5 mb-5 avatar'>
        <div className='w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={authUser.avatar} alt={`avatar/${authUser.avatar}`} />
        </div>
        <Link to={`/${authUser.name}/${authUser.id}/profile`}>{authUser.name}</Link>
      </div>
      <ReactQuill
        className='text-black bg-slate-200'
        modules={module}
        theme='snow'
        placeholder='Type here ..'
        value={content}
        onChange={setContent}
      />
      <div className='flex justify-end w-full mt-3'>
        <button disabled={status === 'loading'} className='btn btn-sm btn-outline btn-accent'>
          {status === 'loading' && <span className='loading loading-spinner'></span>}
          {status === 'loading' ? 'loading' : 'Comment'}
        </button>
      </div>
    </form>
  );
};

export default Editor;
