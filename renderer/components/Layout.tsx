import Head from "next/head"
import React, { type ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const title = "Disable Screen Lock"

  return (
    <div className="flex h-screen select-none flex-col">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  )
}
export default Layout
