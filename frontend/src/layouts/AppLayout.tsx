import { Navigate, Outlet } from 'react-router'
import Footer from "../components/Footer";
import NavBar from '../components/NavBar';

export default function AppLayout() {
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <div className="flex flex-col gap-2 h-dvh">
                <NavBar />
                <main className="grow w-full max-w-4xl m-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        )
    } else {
        return <Navigate to="/auth/iniciar-sesion" />
    }
}