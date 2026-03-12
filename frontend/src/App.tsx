import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./services/authService";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ChallengePage from "./pages/ChallengePage";
import NewChallengePage from "./pages/NewChallengePage";
import PublicProfilePage from "./pages/PublicProfilePage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	return getToken() ? <>{children}</> : <Navigate to='/auth' replace />;
};

const App = () => {
	return (
		<Routes>
			<Route path='/auth' element={<AuthPage />} />
			<Route path='/:username' element={<PublicProfilePage />} />
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
			<Route path='*' element={<Navigate to='/dashboard' replace />} />
		</Routes>
	);
};

export default App;
