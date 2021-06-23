$(() => {
  $("#minimize-btn").on("click", () => {
    ipcRenderer.send('hide-me');
  });

  $("#close-btn").on("click", () => {
    ipcRenderer.send('close-me');
  });
});