import { CurrentEventProvider } from "./context/CurrentEventContext";
import { Sidebar } from "./features/navbar/Sidebar";
import { Dashboard, Events, Login, Users, Profile, Settings } from "./pages/";
import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <main className="flex flex-row h-dvh w-full bg-slate-950">
      <Sidebar />
      <div className="grow p-8">
        <CurrentEventProvider>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<h1>Register</h1>} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </CurrentEventProvider>
      </div>
    </main>
  );
}
