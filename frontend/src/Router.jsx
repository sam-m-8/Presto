import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext, Context } from "./context";

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import PresentationEditPage from './pages/PresentationEditPage';
import PresentationPreviewPage from './pages/PresentationPreviewPage';
import VersionHistoryPage from './pages/VersionHistoryPage';

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getters } = useContext(Context);

  useEffect(() => {
    if (getters.token && ["/login", "/register", "/"].includes(location.pathname)) {
      navigate("/dashboard");
    } else if (!getters.token && !(["/login", "/register", "/"].includes(location.pathname))) {
      navigate("/");
    }
  }, [getters.token, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/presentations/:id/:slideNum" element={<PresentationEditPage />} />
        <Route path="/presentations/:id/:slideNum/present" element={<PresentationPreviewPage />} />
        <Route path="/presentations/:id/history" element={<VersionHistoryPage />} />
      </Routes>
    </>
  )
}

export default Router;