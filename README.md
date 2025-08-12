# Admin Dashboard

A **web-based administration portal** for managing club members, events, and check-ins.  
Designed for **desktop-first** use but fully responsive for mobile.

## Purpose

This dashboard is built to help club admins:

- Approve or reject **new user registrations**.
- Manage **event details** and upload event banners.
- Track and manage **event check-ins**.
- Assign **roles** (Admin / Super Admin).
- Keep an eye on pending actions via built-in **alerts**.

Super Admins have additional powers, such as promoting/demoting admins (including themselves).

---

## Tech Stack

- **Frontend Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) for fast development and optimized builds.
- **UI Library:** [Mantine UI](https://mantine.dev/) for modern, responsive components.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **Backend & Database:** [Supabase](https://supabase.com/) for authentication, role-based access control, and data storage.
- **File Storage:** Supabase storage for event banners & user avatars.
- **State Management:** React hooks (`useReducer`, `useContext`) for predictable global state handling.

---

## Hosting

- **Frontend:** Hosted on [Vercel](https://vercel.com/) for automatic deployments from the `main` branch.
- **Backend:** Supabase handles authentication, API calls, and database hosting.
