'use client'

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HomePageContent from "../components/HomePageContent";
import { isUserAuth } from '@/libs/userManagerApp';


export default function Home() {
  const [isAuth, setIsAuth] = React.useState(false);
  useEffect(() => {
    isUserAuth().then((auth)=> setIsAuth(auth));
  }, []);
  
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar isAuthed={isAuth}/>
      <HomePageContent />
    </main>
  );
}