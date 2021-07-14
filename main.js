const { app, Menu, Tray, ipcMain, BrowserWindow, shell } = require("electron");
const { autoUpdater } = require("electron-updater");
const registerProtocolHandler = require("./src/scripts/register-protocol-handler");
const path = require("path");

const size = 550;
var mainWindow;
var menu;
var pinned = false;
let tray = null;

var calculated = true;
var selected = false;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  registerProtocolHandler();
  app.setAsDefaultProtocolClient("yoo-math");

  mainWindow = new BrowserWindow({
    width: size,
    minWidth: size,
    maxWidth: size,
    height: size,
    minHeight: size,
    maxHeight: size,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, "src/assets/img/favicon.ico"),
    title: "Yoo-Math",
    darkTheme: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
      accessibleTitle: "Yoo-Math"
    }
  });

  home_page();
  mainWindow.resizable = false;

  /*menu = Menu.buildFromTemplate([
    { label: "Home", icon: path.join(__dirname, "src/assets/img/home-small.png"), click: () => {
      mainWindow.show();
      home_page();
    }},
    { label: "About", icon: path.join(__dirname, "src/assets/img/info-small.png"), click: () => {
      mainWindow.show();
      about_page();
    }},
    { label: "History", icon: path.join(__dirname, "src/assets/img/history-small.png"), click: () => {
      mainWindow.show();
      history_page();
    }},
    { label: "Website", icon: path.join(__dirname, "src/assets/img/globe-small.png"), click: () => {
      shell.openExternal("https://www.math.yoo-babobo.com");
    }},
    { label: "Quit", click: () => {
      app.quit();
    }}
  ]);

  Menu.setApplicationMenu(menu);

  tray = new Tray(path.join(__dirname, "src/assets/img/favicon.ico"));
  tray.setToolTip("Yoo-Math");
  tray.setContextMenu(menu);

  tray.on("click", () => {
    mainWindow.show();
  });*/

  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("home-page", home_page);
ipcMain.on("about-page", about_page);
ipcMain.on("history-page", history_page);

ipcMain.on("open-menu", (event) => {
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});

ipcMain.on("pin-toggle", () => {
  if (mainWindow.isAlwaysOnTop() && pinned) {
    mainWindow.setAlwaysOnTop(false);
    pinned = false;
  } else {
    mainWindow.setAlwaysOnTop(true);
    pinned = true;
  }
});

ipcMain.on("pinned", (event) => {
  event.sender.send("pinned", { pinned: pinned });
});

ipcMain.on("restart", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on("hide", () => {
  mainWindow.minimize();
});

ipcMain.on("close", () => {
  app.quit();
});

ipcMain.on("app-version", (event) => {
  event.sender.send("app-version", { version: app.getVersion() });
});

function home_page() {
  mainWindow.loadFile(path.join(__dirname, "src/index.html"));
}

function about_page() {
  mainWindow.loadFile(path.join(__dirname, "src/about.html"));
}

function history_page() {
  mainWindow.loadFile(path.join(__dirname, "src/history.html"));
}