import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useUser from '../../hook/useUser';
import { postNewCommentAsync } from '../../states/slice/create-slice'
import { useAppDispatch } from '../../states/store'

type EditorProps = {
  threadId: string
}
const Editor: React.FC<EditorProps> = ({threadId}) => {
  const dispatch = useAppDispatch()
  const { authUser } = useUser();
  const [content, setContent] = React.useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(postNewCommentAsync({content, threadId}))
    if (content) {
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='items-center gap-5 mb-5 avatar'>
        <div className='w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={authUser.avatar} alt={`avatar/${authUser.avatar}`} />
        </div>
        <span>{authUser.name}</span>
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
        <button type='submit' className='btn btn-sm btn-outline btn-accent'>
          Comment
        </button>
      </div>
    </form>
  );
};

export default Editor;
