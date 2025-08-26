import AdminBase from "../components/layout/AdminBase.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Profile from "../pages/admin/Profile.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: AdminBase,
    children: [
      { path: "dashboard", name: "Dashboard", component: Dashboard },
      { path: "profile", name: "Profile", component: Profile },
    ],
  },
];
