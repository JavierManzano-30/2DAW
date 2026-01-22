import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import { PublicLayout } from './layouts/PublicLayout.jsx';
import { PrivateLayout } from './layouts/PrivateLayout.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { NoSession } from './pages/NoSession.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { PhotoDetail } from './pages/PhotoDetail.jsx';
import { PhotoDetailClosed } from './pages/PhotoDetailClosed.jsx';
import { UploadPhoto } from './pages/UploadPhoto.jsx';
import { UploadSuccess } from './pages/UploadSuccess.jsx';
import { Profile } from './pages/Profile.jsx';
import { ProfileEdit } from './pages/ProfileEdit.jsx';
import { Forbidden } from './pages/Forbidden.jsx';
import { NotFound } from './pages/NotFound.jsx';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/no-session" state={{ from: location }} replace />;
  }

  return children;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/no-session" element={<NoSession />} />
          </Route>
          <Route
            path="/app"
            element={(
              <RequireAuth>
                <PrivateLayout />
              </RequireAuth>
            )}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="photos/upload" element={<UploadPhoto />} />
            <Route path="photos/upload/success" element={<UploadSuccess />} />
            <Route path="photos/:photoId" element={<PhotoDetail />} />
            <Route path="photos/:photoId/closed" element={<PhotoDetailClosed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<ProfileEdit />} />
          </Route>
          <Route
            path="/unauthorized"
            element={(
              <RequireAuth>
                <PrivateLayout />
              </RequireAuth>
            )}
          >
            <Route index element={<Forbidden />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


