import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-theme(spacing.32))]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
