import { ToastType } from "../../types/toast.type.js";

export class Toast {
  constructor() {
    this.loadCSS();
  }

  static icons = {
    [ToastType.INFO]: {
      color: "#74C0FC",
      classes: ["fa-solid", "fa-circle-info"],
    },
    [ToastType.ERROR]: {
      color: "#FD7272",
      classes: ["fa-solid", "fa-circle-exclamation"],
    },
  };

  loadCSS() {
    if (document.querySelector("#toast-css")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../../styles/toast.css";
    link.id = "toast-css";
    document.head.appendChild(link);
  }

  static info(message) {
    const toastContainer = document.getElementById("toast-container");
    const toast = this.createToast(message, ToastType.INFO);

    if (toastContainer) toastContainer.append(toast);
  }

  static error(message) {
    const toastContainer = document.getElementById("toast-container");
    const toast = this.createToast(message, ToastType.ERROR);

    if (toastContainer) toastContainer.append(toast);
  }

  static createToast(message, type) {
    const toastIcon = this.createToastIcon(type);
    const toastBar = this.createToastBar(type);
    const toast = this.createToastContent(toastIcon, toastBar, message);

    toast.addEventListener("mouseenter", () => {
      const currentRight = window
        .getComputedStyle(toastBar)
        .getPropertyValue("right");

      toastBar.style.right = currentRight;
    });

    toast.addEventListener("mouseout", () => {
      toastBar.style.right = "100%";
    });

    toastBar.addEventListener("transitionend", () => {
      toast.remove();
    });

    setTimeout(() => {
      toastBar.style.right = "100%";
    }, 50);

    return toast;
  }

  static createToastIcon(type) {
    const toastIcon = document.createElement("i");
    toastIcon.classList.add(...this.icons[type].classes);
    toastIcon.classList.add("toast-icon");
    toastIcon.style.color = this.icons[type].color;

    return toastIcon;
  }

  static createToastBar(type) {
    const toastBar = document.createElement("div");
    toastBar.setAttribute("class", "toast-bar");
    toastBar.style.background = this.icons[type].color;

    return toastBar;
  }

  static createToastContent(toastBar, toastIcon, message) {
    const toast = document.createElement("div");
    toast.setAttribute("class", "toast");
    toast.append(toastBar);
    toast.append(toastIcon);
    toast.append(message);

    return toast;
  }
}