import '../styles/globals.css'
import Head from 'next/head'
// import * from 'next/'
import { useEffect, useState } from 'react'
// import register from '../public/service-worker'

function MyApp({ Component, pageProps }) {

  const [deferedPrompt, setDeferedPrompt] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {

      // browser code
      window.addEventListener('appinstalled', (evt) => {
        // Log install to analytics
        console.log('INSTALL: Success');
      });

      window.addEventListener('beforeinstallprompt', (evt) => {
        // Log install to analytics
        evt.preventDefault();
        setDeferedPrompt(evt);
      });


      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
          .then(registration => {

            if (registration.installing) {
              console.log('installing', registration.installing);
              registration.installing.addEventListener('statechange', (e) => {
                console.log(e)
              });
            }

            console.log("---->", registration)

          })
          .catch(err => console.error("Service worker registration failed", err))
      } else {
        console.log("Service worker not supported");
      }
    }
  }, [])

  const addToHome = (e) => {
    if (deferedPrompt) {
      deferedPrompt.prompt();
    }
  }

  return (
    <>
      <Head>
        <title>Test app</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Temp test app 1' />
        <meta name="theme-color" content="#4285f4" />
        <title>Next.js PWA Example</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="img/icon512.png" />
        <meta name="apple-mobile-web-app-title" content="PWA Splash" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <Component {...pageProps} addToHome={addToHome} />
      {/* <script src="./service-worker.js"></script> */}
    </>
  )
}

export default MyApp
