import "@/styles/globals.css";
// pages/_app.tsx
import '../styles/globals.css'; // Adjust path if needed

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
