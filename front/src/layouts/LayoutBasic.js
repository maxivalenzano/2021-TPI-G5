import React from "react"

import LoadRoutes from "config/LoadRoutes"

import Header from "components/Header"
import Footer from "components/Footer"


export default function LayoutBasic(props) {
    const { routes } = props

    return (
        <div>
            <Header />
            <LoadRoutes routes={routes} />
            <Footer title="Los cracks" description="Página diseñada para la matería de DACS" />
        </div>
    )
}