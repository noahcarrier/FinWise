import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/DashboardContent";
import React from "react";
import "../app/globals.css";
import { getCacheFromPage } from "@/libs/userManager";
import { NextPageContext } from "next";


export default function Page() {
  
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar isAuthed={true}/>
      <DashboardContent />
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

  /* Return anything you want from database query from here out */
  return {
      props: {}
  }
}