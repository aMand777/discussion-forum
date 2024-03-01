import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TemplateCreate = () => {
  const [value, setValue] = React.useState('')
  const toolbarOptions = [
    [
      'bold',
      'italic',
      'underline',
      { header: [1, 2, 3, 4, 5, 6, false] },
      { list: 'ordered' },
      { list: 'bullet' },
      'link',
      'code-block',
    ],
  ];
  
    const module = {
      toolbar: toolbarOptions,
    };
  
  console.log('value===>', value)
  
  return (
    <form className=''>
      <div className='w-10/12 mx-auto'>
        <label className='w-full form-control'>
          <div className='label'>
            <span className='label-text'>Title</span>
          </div>
          <input type='text' placeholder='Type here . .' className='w-full input input-bordered' />
          <div className='label'></div>
        </label>
        <label className='w-full form-control'>
          <div className='label'>
            <span className='label-text'>Category</span>
          </div>
          <input type='text' placeholder='Type here . .' className='w-full input input-bordered' />
          <div className='label'></div>
        </label>
        <span className='label-text'>Description</span>
        <ReactQuill
          className='h-24'
          modules={module}
          theme='snow'
          value={value}
          onChange={setValue}
        />
      </div>
    </form>
  );
}

export default TemplateCreate