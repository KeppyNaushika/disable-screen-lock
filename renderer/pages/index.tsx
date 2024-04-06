import React from "react"
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
  return (
    <Layout>
      <div className="flex min-h-screen w-screen items-center justify-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-2">
            <label htmlFor="intervalInput">マウスを動かす間隔</label>
            <input
              type="number"
              id="intervalInput"
              defaultValue="3000"
              className="mx-4 rounded-md border-2 p-2"
            />
            <label htmlFor="intervalInput">秒後</label>
          </div>
          <div className="my-8 border-t-2"></div>
          <div className="flex items-center px-4 py-2">
            <input
              type="checkbox"
              id="intervalInput2"
              defaultValue="3000"
              className="size-6 rounded-md border-2"
            />
            <label htmlFor="intervalInput2" className="mx-8">
              一定時間経過後に全画面表示する
            </label>
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <label htmlFor="intervalInput3">全画面表示するまでの時間</label>
            <input
              type="number"
              id="intervalInput3"
              defaultValue="3000"
              className="mx-4 rounded-md border-2 p-2"
            />
            <label htmlFor="intervalInput">秒後</label>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
