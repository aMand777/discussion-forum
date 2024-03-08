import { CiWarning } from 'react-icons/ci';

type AlertMessageProps = {
  message: string | undefined;
};

function AlertMessage({ message }: AlertMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-row p-1 mt-1 rounded-lg alert bg-red-500/30"
    >
      <CiWarning size={20} />
      <span>{message}</span>
    </div>
  );
}

export default AlertMessage;
