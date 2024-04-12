import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/DashboardContent";

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-700 min-h-screen">
      <Navbar />
      <DashboardContent />
      {/* // <p>Dashboard Page</p> */}
    </main>
  );
}