// Native
import { join } from "path"
import { format } from "url"

// Packages
import { BrowserWindow, app, ipcMain, type IpcMainEvent, Menu } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"
import menu from "./menu"

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer")

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  })

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      })
  Menu.setApplicationMenu(menu(app, mainWindow))

  ipcMain.on("set-shortcut", (_event) => {
    Menu.setApplicationMenu(menu(app, mainWindow))
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, _message: any) => {
  setTimeout(() => {
    event.sender.send("message", "hi from electron")
  }, 500)
})
