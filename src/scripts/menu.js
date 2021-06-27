var n = false;

$(() => {
  setInterval(() => {
    ipcRenderer.send("pinned");

    fs.access("history.yoo", fs.F_OK, (err) => {
      if (err) {
        fs.writeFile("history.yoo", "", (err) => {
          if (err) return;
        });

        return;
      }
    });
  }, 20);

  $(document).on("keydown", (e) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case "p":
        case "p":
          ipcRenderer.send("pin-toggle");
          break;
      }
    } else if (e.altKey) {
      if (n) {
        hide_notification();
        n = false;
      } else {
        notification("Test", "This is a test notification...", true, "Click me!", () => {
          alert("You click a notification button!");
        });
  
        n = true;
      }
    }
  });

  $(document).on("scroll", () => {
    var scroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (scroll / height) * 100;
    $("#scroll-bar").css("width", scrolled + "%");
  });

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

  $("#history-btn").on("click", () => {
    ipcRenderer.send("history-page");
  });
});