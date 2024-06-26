// Native
import { join } from "path"
import { format } from "url"

// Packages
import { BrowserWindow, app, ipcMain, Menu } from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"
import menu from "./menu"

import { mouse, Point, sleep } from "@nut-tree/nut-js"

const moveMouse = async () => {
  const mousePos = await mouse.getPosition()
  await mouse.move([new Point(mousePos.x + 1, mousePos.y)])
  await mouse.move([new Point(mousePos.x, mousePos.y)])
}

app.disableHardwareAcceleration()

app.on("ready", async () => {
  await prepareNext("./renderer")

  let preloadPath
  if (app.isPackaged && process.resourcesPath.endsWith("resources")) {
    preloadPath = join(process.resourcesPath, "./app/main/preload.js")
  } else {
    preloadPath = join(app.getAppPath(), "preload.js")
  }

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
    },
  })
  mainWindow.setAutoHideMenuBar(true)

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(app.getAppPath(), "./renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      })
  Menu.setApplicationMenu(menu(app, mainWindow))

  // init values
  const initMoveMouseInterval = 3000
  const initDoFullScreen = true
  const initFullScreenInterval = 3000

  let moveMouseInterval = initMoveMouseInterval
  let doFullScreen = initDoFullScreen
  let fullScreenInterval = initFullScreenInterval

  let mousePos: null | Point = null
  let countStopMouseMove = 0
  let countStopMouseMoveForFullScreen = 0

  setInterval(async () => {
    const newMousePos = await mouse.getPosition()
    if (mousePos === null) {
      mousePos = newMousePos
    } else if (mousePos.x === newMousePos.x && mousePos.y === newMousePos.y) {
      countStopMouseMove++
      countStopMouseMoveForFullScreen++
      if (countStopMouseMove >= moveMouseInterval) {
        await moveMouse()
        countStopMouseMove = 0
      }
      if (countStopMouseMoveForFullScreen >= fullScreenInterval) {
        if (doFullScreen) {
          mainWindow.maximize()
          await sleep(1000)
          mainWindow.setFullScreen(true)
          mainWindow.webContents.send("set-bg-black", true)
        } else {
          countStopMouseMoveForFullScreen = 0
        }
      }
    } else {
      countStopMouseMove = 0
      countStopMouseMoveForFullScreen = 0
      mousePos = newMousePos
    }
  }, 1000)

  // renderer -> main
  ipcMain.on("set-shortcut", (_event) => {
    Menu.setApplicationMenu(menu(app, mainWindow))
  })
  ipcMain.on("set-interval", (_event, interval: number) => {
    moveMouseInterval = interval
  })
  ipcMain.on("set-full-screen", (_event, newDoFullScreen: boolean) => {
    doFullScreen = newDoFullScreen
  })
  ipcMain.on("set-full-screen-interval", (_event, interval: number) => {
    fullScreenInterval = interval
  })

  // main -> renderer
  mainWindow.webContents.send("set-interval", initMoveMouseInterval)
  mainWindow.webContents.send("set-full-screen", doFullScreen)
  mainWindow.webContents.send(
    "set-full-screen-interval",
    initFullScreenInterval,
  )
  isDev && mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)
