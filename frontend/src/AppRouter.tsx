import { BrowserRouter, Route, Routes } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import ConfirmAccountPage from "./pages/auth/ConfirmAccountPage"
import AppLayout from "./layouts/AppLayout"
import AppIndexPage from "./pages/AppIndexPage"

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        {/* modulo de autenticacion */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="iniciar-sesion" element={<LoginPage />} />
          <Route path="crear-cuenta" element={<SignupPage />} />
          <Route path="confirmar-cuenta/:uuidUser" element={<ConfirmAccountPage />} />
        </Route>

        {/* app */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AppIndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
