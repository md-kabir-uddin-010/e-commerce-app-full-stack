const sidebarData = [
  {
    id: 1,
    header: "dashboard",
    links: [{ id: 1, title: "dashboard", link: "/admin/dashboard" }],
  },
  {
    id: 2,
    header: "lists",
    links: [
      { id: 1, title: "users", link: "/admin/dashboard/users" },
      { id: 2, title: "products", link: "/admin/dashboard/products" },
      { id: 3, title: "orders", link: "/admin/dashboard/orders" },
    ],
  },

  {
    id: 4,
    header: "service",
    links: [
      { id: 1, title: "logs", link: "/admin/dashboard/logs" },
      { id: 2, title: "settings", link: "/admin/dashboard/settings" },
    ],
  },
  {
    id: 6,
    header: "user",
    links: [{ id: 1, title: "profile", link: "/admin/dashboard/profile" }],
  },
];
export default sidebarData;
