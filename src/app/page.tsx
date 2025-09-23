import HomeContainer from "@/components/Home/HomeContainer";


import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home Page",
};
export default function Home() {


  return (
    <>
      <HomeContainer />
    </>
  )
}
