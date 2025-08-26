import AdminBase from "../components/layout/AdminBase.vue";
import Dashboard from "../pages/admin/Dashboard.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: AdminBase,
    children: [
      { path: "dashboard", name: "Dashboard", component: Dashboard },
    ],
  },
];
