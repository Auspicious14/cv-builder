import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="w-full h-full text-center bg-amber-500">
        <h1 className="text-lg">
          Build an <span className="text-blue-500">awesome</span> CV in few
          minutes with CV Builder
        </h1>
      </div>
    </>
  );
}
