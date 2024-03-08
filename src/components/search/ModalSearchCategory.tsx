import InputSearchCategory from './InputSearchCategory.tsx';

function ModalSearchCategory() {
  return (
    <dialog id="modal_search_category" className="modal">
      <div className="modal-box overflow-auto">
        <InputSearchCategory />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" id="search">
          close
        </button>
      </form>
    </dialog>
  );
}

export default ModalSearchCategory;
