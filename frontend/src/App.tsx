import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./services/authService";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ChallengePage from "./pages/ChallengePage";
import NewChallengePage from "./pages/NewChallengePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import { Analytics } from "@vercel/analytics/react";
import LandingPage from "./pages/LandingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	return getToken() ? <>{children}</> : <Navigate to='/auth' replace />;
};

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/challenges/new'
					element={
						<ProtectedRoute>
							<NewChallengePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/challenges/:id'
					element={
						<ProtectedRoute>
							<ChallengePage />
						</ProtectedRoute>
					}
				/>
				<Route path='/:username' element={<PublicProfilePage />} />
				<Route
					path='*'
					element={
						getToken() ? (
							<Navigate to='/dashboard' replace />
						) : (
							<Navigate to='/' replace />
						)
					}
				/>
			</Routes>
			<Analytics />
		</>
	);
};

export default App;
