export const getMenuData = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('home'),
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: t('products'),
    newTab: false,
    path: "/products",
  },
  {
    id: 33,
    title: t('about'),
    newTab: false,
    path: "/about",
  },
  {
    id: 3,
    title: t('contact'),
    newTab: false,
    path: "/contact",
  }
];