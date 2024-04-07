import { contextBridge, ipcRenderer, IpcRenderer } from "electron"

declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
  var ipcRenderer: IpcRenderer
}

contextBridge.exposeInMainWorld("electronAPI", {
  // renderer -> main
  setMoveMouseInterval: (moveMouseInterval: number) =>
    ipcRenderer.send("set-interval", moveMouseInterval),
  setFullScreen: (doFullScreen: boolean) =>
    ipcRenderer.send("set-full-screen", doFullScreen),
  setFullScreenInterval: (interval: number) =>
    ipcRenderer.send("set-full-screen-interval", interval),
  // main -> renderer
  initMoveMouseInterval: (callback: (interval: number) => void) => {
    ipcRenderer.on("set-interval", (_event, interval) => callback(interval))
  },
  initDoFullScreen: (callback: (doFullScreen: boolean) => void) => {
    ipcRenderer.on("set-full-screen", (_event, doFullScreen) =>
      callback(doFullScreen),
    )
  },
  initFullScreenInterval: (callback: (interval: number) => void) => {
    ipcRenderer.on("set-full-screen-interval", (_event, interval) =>
      callback(interval),
    )
  },
  setBgBlack: (isBgBlack: boolean) =>
    ipcRenderer.send("set-bg-black", isBgBlack),
})

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer
})
