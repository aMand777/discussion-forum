import React from 'react';
import { CiWarning } from 'react-icons/ci';

type AlertMessageProps = {
  message: string | undefined;
};

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <>
      <div role='alert' className='alert bg-red-500/30 p-1 mt-1 rounded-lg flex flex-row'>
        <CiWarning size={20} />
        <span>{message}</span>
      </div>
    </>
  );
};

export default AlertMessage;
