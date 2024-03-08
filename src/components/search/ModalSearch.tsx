import InputSearch from './InputSearch.tsx';

function ModalSearch() {
  return (
    <dialog id="modal_search" className="modal">
      <div className="modal-box overflow-auto">
        <InputSearch />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" id="search">
          close
        </button>
      </form>
    </dialog>
  );
}

export default ModalSearch;
