import { BrowserRouter, Route, Routes } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import ConfirmAccountPage from "./pages/auth/ConfirmAccountPage"

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="iniciar-sesion" element={<LoginPage />} />
          <Route path="crear-cuenta" element={<SignupPage />} />
          <Route path="confirmar-cuenta" element={<ConfirmAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
