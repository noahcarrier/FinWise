import Navbar from "@/components/Navbar";
import { DashboardContent, lessonInfo } from "@/components/DashboardContent";
import {useState, useEffect } from "react";
import "../app/globals.css";
import { getCacheFromPage } from "@/libs/userManager";
import { NextPageContext } from "next";
import { userProps } from "@/components/DashboardContent";
import { getLessonsById } from "@/libs/createFlashcards";


type props = {
  lesson: lessonInfo[] | undefined;
}

let updateOutside: any;

export default function Page(props: props) {

// const [userId, setUserId] = useState(4);

  
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar isAuthed={true}/>
      <DashboardContent lessonInfo={props.lesson}/>
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

  

  return {
      props: {
        lesson: await getLessonsById(user.id)
      }
  }
}