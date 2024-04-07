import React, { useEffect } from "react"
import Layout from "../components/Layout"
import { type IpcRenderer } from "electron"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
}

const IndexPage = (): JSX.Element => {
  const [interval, setInterval] = React.useState<number>(300)
  const [doFullScreen, setDoFullScreen] = React.useState<boolean>(true)
  const [fullScreenInterval, setFullScreenInterval] =
    React.useState<number>(300)
  const [isBgBlack, setIsBgBlack] = React.useState<boolean>(false)

  useEffect(() => {
    window.electronAPI.initMoveMouseInterval((interval: number) => {
      setInterval(interval)
    })
    window.electronAPI.initDoFullScreen((doFullScreen: boolean) => {
      setDoFullScreen(doFullScreen)
    })
    window.electronAPI.initFullScreenInterval((fullScreenInterval: number) => {
      setFullScreenInterval(fullScreenInterval)
    })
    window.electronAPI.setBgBlack((newIsBgBlack: boolean) => {
      setIsBgBlack(newIsBgBlack)
    })
  }, [])

  return (
    <Layout>
      {isBgBlack ? (
        <div
          className="flex min-h-screen w-screen bg-black"
          onClick={() => {
            setIsBgBlack(false)
          }}
        ></div>
      ) : (
        <div className="flex min-h-screen w-screen items-center justify-center">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2">
              <label htmlFor="intervalInput">カーソルを動かす間隔</label>
              <input
                type="number"
                id="intervalInput"
                onChange={(e) => {
                  const newInterval = Number(e.target.value)
                  if (newInterval >= 0 && newInterval <= 3600) {
                    setInterval(newInterval)
                    window.electronAPI.setMoveMouseInterval(newInterval)
                  }
                }}
                value={interval}
                className="mx-4 rounded-md border-2 p-2"
              />
              <label htmlFor="intervalInput">秒後</label>
            </div>
            <div className="my-4 border-t-2"></div>
            <div className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                id="intervalInput2"
                onChange={(e) => {
                  setDoFullScreen(e.target.checked)
                  window.electronAPI.setDoFullScreen(e.target.checked)
                }}
                checked={doFullScreen}
                className="size-6 rounded-md border-2"
              />
              <label htmlFor="intervalInput2" className="mx-8">
                一定時間経過後に全画面表示する
              </label>
            </div>
            <div className="relative flex items-center justify-between px-4 py-2">
              {!doFullScreen && (
                <div className="absolute size-full bg-white/80"></div>
              )}
              <label htmlFor="intervalInput3">全画面表示するまでの時間</label>
              <input
                type="number"
                id="intervalInput3"
                onChange={(e) => {
                  const newInterval = Number(e.target.value)
                  if (newInterval >= 0 && newInterval <= 3600) {
                    setFullScreenInterval(newInterval)
                    window.electronAPI.setFullScreenInterval(newInterval)
                  }
                }}
                value={fullScreenInterval}
                className="mx-4 rounded-md border-2 p-2"
              />
              <label htmlFor="intervalInput">秒後</label>
            </div>
            <div className="my-4 border-t-2"></div>
            <div className="flex flex-col items-center justify-between px-4 py-2">
              <div className="pb-4 text-xs">
                本ソフトウェアは、1秒ごとにカーソルの位置を取得します。
              </div>
              <div className="pb-4 text-xs">
                設定画面をもう一度開くには、黒い画面のどこかをクリックしてください。
              </div>
              <div className="">
                <div className="text-xs">
                  MacOS では、Xcode
                  コマンドラインツールとアクセシビリティ設定が必要です。
                </div>
                <div className="text-xs">
                  １．ターミナルで xcode-select --install を実行します。
                </div>
                <div className="text-xs">
                  ２．アクセシビリティ設定で「キーボードとマウスの操作」を許可します。
                </div>
              </div>
              <div className="my-4 border-t-2"></div>
              <div
                className="flex w-48 justify-center rounded-md bg-slate-800 p-4 text-white"
                onClick={() => {
                  setIsBgBlack(true)
                }}
              >
                設定を閉じる
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
