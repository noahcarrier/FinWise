import Navbar from "@/components/Navbar";
import { DashboardContent } from "@/components/DashboardContent";
import {useState, useEffect } from "react";
import "../app/globals.css";
import { getCacheFromPage } from "@/libs/userManager";
import { NextPageContext } from "next";
import { userProps } from "@/components/DashboardContent";

// let username = "";

let userId = 0;
let updateOutside: any;

export default function Page() {

// const [userId, setUserId] = useState(4);

  
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar isAuthed={true}/>
      <DashboardContent userId={userId}/>
      {/* // <p>Dashboard Page</p> */}
    </main>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  /* USE THIS CODE TO TEST AUTHENTICATION (yes, just copy and paste this to page that needs authentication)*/
  const user = await getCacheFromPage(context);

  if (!user) {
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      };
  }

  userId = user.id;

  return {
      props: {}
  }
}