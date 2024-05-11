class notification {
  constructor() {
    this.notificationDetails = {
      timer: 5000,
      success: {
        icon: "fa-circle-check",
        text: "Success: This is a success message.",
      },
      error: {
        icon: "fa-circle-xmark",
        text: "Error: This is an error message.",
      },
      warning: {
        icon: "fa-triangle-exclamation",
        text: "Warning: This is a warning message.",
      },
      info: {
        icon: "fa-circle-info",
        text: "Info: This is an information message.",
      },
    };
  }

  removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
  };

  createToast = (type, message) => {
    const { icon } = this.notificationDetails[type];
    const toast = document.createElement("li");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="column">
                          <i class="fa-solid ${icon}"></i>
                          <span>${message}</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>`;

    toast.querySelector(".fa-xmark").addEventListener("click", () => {
      this.removeToast(toast);
    });

    toast.timeoutId = setTimeout(() => {
      this.removeToast(toast);
    }, this.notificationDetails.timer);

    // Set a timeout to automatically remove the toast after a specified duration
    toast.timeoutId = setTimeout(() => {
      this.removeToast(toast);
    }, this.notificationDetails.timer);

    return toast;
  };
}

export { notification };
