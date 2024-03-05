function postedAt(date: string): string {
  const now = new Date();
  const posted = new Date(date);
  const diff = now.getTime() - posted.getTime();

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } else if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }

  return 'just now';
}

const openModal = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;
  if (modal) {
    modal.showModal();
  }
};

const closeModal = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;
  modal?.close()
};

export { postedAt, openModal, closeModal };
