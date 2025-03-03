import { Fira_Code as FontMono, Inter as FontSans, Roboto } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
  variable: "--font-roboto",
});