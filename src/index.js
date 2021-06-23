const { app, ipcMain, globalShortcut, BrowserWindow } = require("electron");
const path = require("path");

const size = 550;
var mainWindow;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: size,
    minWidth: size,
    maxWidth: size,
    height: size,
    minHeight: size,
    maxHeight: size,
    frame: false,
    icon: path.join(__dirname, "assets/img/favicon.ico"),
    title: "Calculat∅r",
    darkTheme: true,
    backgroundColor: "#2f3129",
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.resizable = false;
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

ipcMain.on("hide-me", () => {
  mainWindow.minimize();
});

ipcMain.on("close-me", () => {
  app.quit();
});

ipcMain.on("app-version", (event) => {
  event.sender.send("app-version", { version: app.getVersion() });
});