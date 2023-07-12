// import "@/styles/globals.css";
import React, { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHmnEcViYWeE-SIPAB2HTX2S5KgfXBrAg",
  authDomain: "pdyc-mymusic.firebaseapp.com",
  projectId: "pdyc-mymusic",
  storageBucket: "pdyc-mymusic.appspot.com",
  messagingSenderId: "356118674365",
  appId: "1:356118674365:web:6b4800198f987b71dc70d4",
  measurementId: "G-0RTZEJ8GBT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {}, // optional
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {}, // optional
  },
});

export default function App({ Component, pageProps }) {

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}