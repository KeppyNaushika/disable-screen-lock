declare global {
  interface Window {
    electronAPI: myAPI
  }
}

export interface myAPI {
  setMoveMouseInterval: (moveMouseInterval: number) => void
  setDoFullScreen: (doFullScreen: boolean) => void
  setFullScreenInterval: (fullScreenInterval: number) => void

  initMoveMouseInterval: (callback: (moveMouseInterval: number) => void) => void
  initDoFullScreen: (callback: (doFullScreen: boolean) => void) => void
  initFullScreenInterval: (
    callback: (fullScreenInterval: number) => void,
  ) => void
  setBgBlack: (callback: (isBgBlack: boolean) => void) => void
}
