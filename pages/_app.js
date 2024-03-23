import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import {
  Bungee_Spice,
  Bungee_Hairline,
  Courier_Prime,
} from "@next/font/google";

const bungeeSpice = Bungee_Spice({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee-spice",
});

const bungeeHairline = Bungee_Hairline({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee-hailine",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <UserProvider>
      <main
        className={`${bungeeSpice.variable} ${bungeeHairline.variable} ${courierPrime.variable} font-main`}
      >
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  );
}

export default MyApp;
