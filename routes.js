import { lazy } from 'react';
import Home from 'pages/home';
import Anuj from 'pages/anuj';
import AnuApi from 'pages/AnuApi';
const EmployeeList = lazy(() => import('pages/employeeList'));
const EmployeeEdit = lazy(() => import('pages/employeeEdit'));
const CustomerList = lazy(() => import('pages/customerList'));
const CustomerEdit = lazy(() => import('pages/customerEdit'));
const EmployeeImport = lazy(() => import('pages/employeeImport'));
const Tracking = lazy(() => import('pages/tracking'));
const GeoFence = lazy(() => import('pages/geoFences'));
const ProductsList = lazy(() => import('pages/products/productList'));
const ProductForm = lazy(() => import('pages/products/productEdit'));
const VariantForm = lazy(() => import('pages/products/variantEdit'));
const PluginsList = lazy(() => import('pages/pluginList'));
const PluginsDetails = lazy(() => import('pages/pluginDetail'))
const CalendarDemo = lazy(() => import('pages/calendarDemo'));

/******Calendar Demo****************************************/
/*********************rror: A React component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.*************************/
// path: <URL on which the page will open up> //
// exact: <By default true. if your page contains Tabs, then false>
// component: <the React file which will be used to show UI>,
// layout: < Can be 'HeaderLayout' or 'DashboardLayout(if your page needs sidemenu, use this)'>
// publicOnly: to be used if can only be opened up without login true,
// private: to be used if can only be opened up with login true,
/**********************************************/
/**********************************************/
export default [
  {
    path: '/',
    exact: true,
    component: Home,
    layout: 'HeaderLayout',
  },
  {
    path: '/users',
    exact: true,
    private: true,
    component: EmployeeList,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Users' }],
    heading: {
      title: 'Users',
      subTitle: 'View & manage all your Users profiles',
    },
  },
  {
    path: '/users-import',
    private: true,
    component: EmployeeImport,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Users', path: '/users/' }, { label: 'Bulk Import Users' }],
    heading: {
      title: 'Bulk Import Users',
    },
  },
  {
    path: '/users/:id',
    private: true,
    component: EmployeeEdit,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Users', path: '/users' }, { label: ':id' }],
    heading: {
      title: 'User',
      subTitle: 'Basic and Contact Information',
    },
    permissions: ['employee_update'],
  },
  {
    path: '/customers/list/:status',
    exact: true,
    private: true,
    component: CustomerList,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Manage Customers' }, { label: ':status' }],
    heading: {
      title: 'Customers',
      subTitle: 'Create & Manage Customers',
    },
  },
  {
    path: '/customers/:id',
    private: true,
    component: CustomerEdit,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Manage Customers', path: '/customers/list/new' }, { label: ':id' }],
    heading: {
      title: 'Customer',
      subTitle: 'Basic Details, Notes, Documents & Audits',
    },
    actions: {
      objectId: ':id',
      contentTypeName: 'customers_customer',
      contentTypeId: 27,
      actionItems: ['notes', 'audits', 'docs'],
    },
    permissions: ['customer_update'],
  },
  {
    path: '/tracking',
    private: true,
    exact: true,
    component: Tracking,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Customer' }, { label: 'Tracking' }],
    heading: {
      title: 'Customer Tracking',
      subTitle: 'View tracking details of Customers',
    },
  },
  {
    path: '/geo-fences',
    private: true,
    exact: true,
    component: GeoFence,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Customer' }, { label: 'Geo Fence' }],
    heading: {
      title: 'Customer Geo Fences',
      subTitle: 'View tracking details of Customers',
    },
  },
  {
    path: '/products',
    private: true,
    exact: true,
    component: ProductsList,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Products' }],
    heading: {
      title: 'Products',
      subTitle: 'View And Manage Products',
    },
  },
  {
    path: '/product/:id',
    private: true,
    exact: true,
    component: ProductForm,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Products', path: '/products' }, { label: ':id' }],
    heading: {
      title: 'Product',
      subTitle: 'Product Information',
    },
  },
  {
    path: '/product-variant/:id',
    private: true,
    exact: true,
    component: VariantForm,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Products', path: '/products' }, { label: ':id' }],
    heading: {
      title: 'Product Variant',
      subTitle: 'Product Variant Information',
    },
  },
  {
    path: '/plugins',
    private: true,
    exact: true,
    component: PluginsList,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Plugins' }],
    heading: {
      title: 'Plugins',
      subTitle: 'Manage plugins',
    },
  },
  {
    path: '/plugins/:id',
    exact: true,
    private: true,
    component: PluginsDetails,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Plugins', path: '/plugins' }, { label: ':id' }],
    heading: {
      title: 'Plugin Details',
      subTitle: 'View and manage plugin details',
    },
    noHeader: true,
  },
  {
    path: '/calendar-demo',
    private: true,
    component: CalendarDemo,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Calendar Demo', path: '/calendar-demo' }],
    heading: {
      title: 'Calendar Demo',
    },
  },
  {
    path: '/training/anuj',
    private: false,
    component: Anuj,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Calendar Demo', path: '/calendar-demo' }],
    heading: {
      title: 'Anuj',
    },
  },
  {
    path: '/training/AnuApi',
    private: false,
    component: AnuApi,
    layout: 'DashboardLayout',
    breadcrumbPath: [{ label: 'Calendar Demo', path: '/calendar-demo' }],
    heading: {
      title: 'Anuj',
    },
  },
];
