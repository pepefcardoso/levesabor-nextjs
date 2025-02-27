const routes = {
  home: "/",
  about: "/about",
  advertisement: "/advertisement",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms-of-use",
  auth: {
    login: "/login",
    forgotPassword: "/login/forgot-password",
    register: "/login/register",
  },
  posts: {
    index: "/posts",
    details: (id: string) => `/posts/${id}`,
  },
  recipes: {
    index: "/recipes",
    details: (id: string) => `/recipes/${id}`,
  },
  resetPassword: "/reset-password",
  user: {
    profile: "/user/profile",
    posts: {
      index: "/user/posts",
      create: "/user/posts/add",
      update: (id: string) => `/user/posts/update/${id}`,
    },
    recipes: {
      index: "/user/recipes",
      create: "/user/recipes/add",
      update: (id: string) => `/user/recipes/update/${id}`,
    },
  },
};

export default routes;
