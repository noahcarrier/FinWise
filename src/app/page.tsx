import Image from "next/image";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../components/Navbar';
import HomePageContent from "../components/HomePageContent";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar />
      <HomePageContent />
    </main>
  );
}