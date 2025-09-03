import AdminBase from "../components/layout/AdminBase.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Profile from "../pages/admin/Profile.vue";
import User from "../pages/admin/User.vue";
import Category from "../pages/admin/Category.vue";
import Product from "../pages/admin/Product.vue";
import Testimonial from "../pages/admin/Testimonial.vue";
import Gallery from "../pages/admin/Gallery.vue";
import Client from "../pages/admin/Client.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: AdminBase,
    children: [
      { path: "", redirect: "dashboard" }, 
      { path: "dashboard", name: "Dashboard", component: Dashboard },
      { path: "user", name: "User", component: User },
      { path: "category", name: "Category", component: Category },
      { path: "product", name: "Product", component: Product },
      { path: "testimonial", name: "Testimonial", component: Testimonial },
      { path: "gallery", name: "Gallery", component: Gallery },
      { path: "client", name: "Client", component: Client },
      { path: "profile", name: "Profile", component: Profile },
    ],
  }
];
