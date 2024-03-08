/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../utils/index.ts';

function InputSearch() {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = React.useState<string | undefined>('');
  const searchRef = React.useRef<HTMLInputElement>(null);

  const handleChange = () => {
    setValueSearch(searchRef.current?.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && valueSearch?.trim() !== '') {
      setValueSearch('');
      event.preventDefault();
      closeModal('modal_search');
      navigate(`/threads/categories/${valueSearch?.toLocaleLowerCase()}`);
    }
  };

  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        ref={searchRef}
        type="text"
        className="grow"
        placeholder="Search by category"
        value={valueSearch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

export default InputSearch;
