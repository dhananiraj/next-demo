import Head from 'next/head'
// import styles from '../styles/Home.module.css'

export default function Home({ addToHome }) {
  return (
    <>
      <button id="btn-install-app" onClick={addToHome} className="btn">Install App</button>

      <h1>Home</h1>
        HELLO WORLD
    </>
  )
} 