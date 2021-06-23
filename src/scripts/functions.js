function notification(title, message, button2_enabled = false, button2_text = null, button2 = () => {}) {
    $("#notification-title").text(title);
    $("#notification-message").text(message);

    $("#notification-button1").css("opacity", 1);
    setTimeout(() => {
        $("#notification-button1").show();
    }, 500);
    $("#notification-button1").on("click", () => {
        $("#notification").css("opacity", 0);
        $("#notification-button1").css("opacity", 0);
        $("#notification-button2").css("opacity", 0);
        setTimeout(() => {
            $("#notification").hide();
            $("#notification-button1").hide();
            $("#notification-button2").hide();
        }, 500);
    });

    if (button2_enabled) {
        $("#notification-button2").text(button2_text);
        $("#notification-button2").css("opacity", 1);
        setTimeout(() => {
            $("#notification-button2").show();
        }, 500);
        $("#notification-button2").on("click", button2);
    }

    $("#notification").css("opacity", 1);
    setTimeout(() => {
        $("#notification").show();
    }, 500);
}

ipcRenderer.on("pinned", (event, data) => {
    if (data.pinned) {
        $("#pin-btn").addClass("pinned");
    } else {
        $("#pin-btn").removeClass("pinned");
    }
});

ipcRenderer.send("app-version");
ipcRenderer.on("app-version", (event, data) => {
    ipcRenderer.removeAllListeners("app-version");
    $("#version").text(data.version)
});

ipcRenderer.on("update_available", () => {
    ipcRenderer.removeAllListeners("update_available");
    notification("Update", "A new update is available. Downloading now...");
});

ipcRenderer.on("update_downloaded", () => {
    ipcRenderer.removeAllListeners("update_downloaded");
    notification("Update", "Update Downloaded. It will be installed on restart. Restart now?", true, "Restart", () => {
        ipcRenderer.send("restart");
    });
});