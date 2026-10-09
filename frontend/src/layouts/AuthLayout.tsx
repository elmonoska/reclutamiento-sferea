import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function AuthLayout() {
    return (
        <>
            <div className="">
                <main className="">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}