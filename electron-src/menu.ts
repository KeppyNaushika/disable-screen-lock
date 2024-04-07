import { sleep } from "@nut-tree/nut-js"
import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron"

const menu = (app: Electron.App, mainWindow: BrowserWindow) => {
  const mainMenus: MenuItemConstructorOptions[] = [
    {
      label: "Disable Screen Lock",
      submenu: [
        {
          label: "設定",
          accelerator: process.platform === "darwin" ? "Cmd+," : "Alt+S",
          click() {
            app.quit()
          },
        },
        {
          label: "最小化",
          accelerator: "Space",
          async click() {
            mainWindow.setFullScreen(false)
            await sleep(1000)
            mainWindow.minimize()
          },
        },
        {
          label: "終了",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Control+Q",
          click() {
            app.quit()
          },
        },
        {
          label: "全画面表示",
          accelerator: "Ctrl+Command+F",
          click: function () {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          },
        },
        {
          label: "開発者ツール",
          accelerator: "Alt+Command+I",
          click: function () {
            mainWindow.webContents.toggleDevTools()
          },
        },
      ],
    },
    {
      label: "編集",
      submenu: [
        { label: "元に戻す", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "やり直し", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
        { type: "separator" },
        { label: "切り取り", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "コピー", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "貼り付け", accelerator: "CmdOrCtrl+V", role: "paste" },
        {
          label: "全選択",
          accelerator: "CmdOrCtrl+A",
          role: "selectAll",
        },
      ],
    },
  ]
  return Menu.buildFromTemplate([...mainMenus])
}
export default menu
