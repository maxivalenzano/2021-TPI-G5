import React from 'react'
import errorImage from '../assets/error.png'

export default function Erro404() {
    return (
        <div style={styles.container}>
            <img src={errorImage} alt='404 Error' style={{height: 300}}/>
            <h3 style={styles.text}>Error! This page not found.</h3>
        </div>
    )
}

const styles = {
  text: {
    fontSize: 24,
    fontFamily: "monospace",
    paddingBottom: 20
  },
  container: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    flexDirection: "column",
  },
};