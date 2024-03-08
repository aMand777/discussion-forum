import InputSearchUser from './InputSearchUser.tsx';

function ModalSearchUser() {
  return (
    <dialog id="modal_search_user" className="modal">
      <div className="modal-box overflow-auto">
        <InputSearchUser />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" id="search">
          close
        </button>
      </form>
    </dialog>
  );
}

export default ModalSearchUser;
