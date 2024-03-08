import React from 'react';
import { IoMdClose } from 'react-icons/io';

type AlertToastProps = {
  children: React.ReactNode;
  message: string;
  alert: string;
  onClickButtonClose: () => void;
};

function AlertToast({
  children,
  message,
  alert,
  onClickButtonClose,
}: AlertToastProps) {
  return (
    <div role="alert" className={`alert ${alert} relative py-3 sm:px-10 flex`}>
      {children}
      <span>{message}</span>
      <IoMdClose
        onClick={onClickButtonClose}
        size={20}
        className="absolute top-0 right-0 cursor-pointer"
      />
    </div>
  );
}

export default AlertToast;
