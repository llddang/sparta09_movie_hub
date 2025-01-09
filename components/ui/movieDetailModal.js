import { BookmarkType } from "../../types/bookmark.type.js";
import { Modal } from "../common/modal.js";

export class MovieDetailModal extends Modal {
  constructor(type) {
    super();
    this.type = type;
  }

  open(movie) {
    this.movie = movie;
    const content = this.createContent();

    const modal = this.createModal(movie.title, content);
    const modalBackdrop = this.createModalBackdrop();

    document.body.style.overflow = "hidden";
    document.body.append(modalBackdrop);
    document.body.append(modal);
  }

  createContent() {
    const content = document.createElement("div");
    content.style = "display: flex; flex-direction: column; gap: 1.25rem;";
    content.innerHTML = `
      <img
        class="movie-modal-poster"
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/${this.movie.poster_path}"
        alt="${this.movie.title} 포스터" />
      <b style="movie-modal-title">${this.movie.title}</b>
      <p>${this.movie.overview}</p>
      <p><b>개봉일: </b>${this.movie.release_date}</p>
      <p><b>평점: </b>${this.movie.vote_average}</p>
    `;

    const bookmarkButton = this.createBookmarkButton();
    content.append(bookmarkButton);

    return content;
  }

  createBookmarkButton() {
    const bookmarkButton = document.createElement("button");
    bookmarkButton.setAttribute("class", "movie-modal-bookmark-button");

    if (this.type === BookmarkType.ADD) {
      bookmarkButton.innerText = "북마크 추가";
      bookmarkButton.addEventListener("click", this.handleAddBookmarkClick);
    } else {
      bookmarkButton.innerText = "북마크 취소";
      bookmarkButton.addEventListener("click", this.handleCancelBookmarkClick);
    }

    return bookmarkButton;
  }

  handleCancelBookmarkClick() {
    // TODO
  }

  handleAddBookmarkClick() {
    // TODO
  }
}