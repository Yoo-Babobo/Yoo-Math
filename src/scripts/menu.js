$(() => {
  setInterval(() => {
    ipcRenderer.send("pinned");
  }, 20);

  $("#home-btn").on("click", () => {
    ipcRenderer.send("home-page");
  });

  $("#minimize-btn").on("click", () => {
    ipcRenderer.send("hide");
  });

  $("#close-btn").on("click", () => {
    ipcRenderer.send("close");
  });

  $("#pin-btn").on("click", () => {
    ipcRenderer.send("pin-toggle");
  });

  $("#about-btn").on("click", () => {
    ipcRenderer.send("about-page");
  });
});