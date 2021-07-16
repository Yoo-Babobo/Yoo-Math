const { ipcRenderer, shell } = require("electron");
const fs = require("fs");

$(() => {
    $("input, button, a").prop("tabIndex", -1);
    $("button").on("focus", () => $("button").trigger("blur"));
});

function notification(title, message, button2_enabled = false, button2_text = null, button2 = () => {}) {
    $("#notification-title").text(title);
    $("#notification-message").text(message);

    $("#notification-button1").on("click", () => hide_notification());

    if (button2_enabled) {
        $("#notification-button2").text(button2_text);
        $("#notification-button2").show();
        $("#notification-button2").on("click", button2);
    }

    $("#notification").css("opacity", 1);
    $("#notification").css("height", "33%");
}

function hide_notification() {
    $("#notification").css("opacity", 0);
    $("#notification").css("height", "0%");

    setTimeout(() => $("#notification-button2").hide(), 500);
}

function add_to_history(math) { fs.appendFile("history.yoo", math + "\n", (err) => { if (err) return; }); }
function clear_history() {
    fs.writeFile("history.yoo", "", err => { if (err) return; });
    $("#history").html("<p></p>");
}

function open_link(url) { shell.openExternal(url); }

ipcRenderer.on("pinned", (event, data) => {
    if (data.pinned) $("#pin-btn").addClass("active");
    else $("#pin-btn").removeClass("active");
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
    notification("Update", "Update Downloaded. It will be installed on restart. Restart now?", true, "Restart", () => ipcRenderer.send("restart"));
});