import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "./components/common/Wrapper";
import Dashboard from "./reports/Dashboard";
import ErrorPage from "./reports/Error";
import AddClient from "./components/client/AddClient";
import ClientList from "./components/client/clientLists";
import EditClient from "./components/client/EditClient";
import AddClientType from "./components/clientType/AddClientType";
import ClientTypeList from "./components/clientType/ClientTypeList";
import EditClientType from "./components/clientType/EditClientType";
import AddShipment from "./components/shipment/AddShipment";
import ShipmentList from "./components/shipment/ShipmentList";
import EditShipment from "./components/shipment/EditShipment";
import AddInvoice from "./components/invoice/AddInvoice";
import InvoiceList from "./components/invoice/InvoiceList";
import EditInvoice from "./components/invoice/EditInvoice";
import AddPayment from "./components/payment/AddPayment";
import PaymentList from "./components/payment/paymentList";
import EditPayment from "./components/payment/EditPayment";
import AddProduct from "./components/product/AddProduct";
import ProductList from "./components/product/ProductList";
import EditProduct from "./components/product/EditProduct";
import AddExpense from "./components/expense/AddExpense";
import ExpenseList from "./components/expense/ExpenseList";
import EditExpense from "./components/expense/EditExpense";
import AddOrder from "./components/order/AddOrder";
import OrderList from "./components/order/OrderList";
import EditOrder from "./components/order/EditOrder";
import SignIn from "./reports/SignIn";
import AddUser from "./components/user/AddUser";
import UserList from "./components/user/UserList";
import EditUser from "./components/user/EditUser";
import ChangePassword from "./components/user/ChangePassword";
import UserPermissions from "./components/user/UserPermissions";
import AddPermissions from "./components/user/AddPermissions";
import Permissions from "./components/user/Permissions";
import PermissionList from "./components/user/PermissionList";
import EditPermission from "./components/user/EditPermission";


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    // element: <Wrapper />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/sign-in",
    // element: <Wrapper />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/change-password",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/user-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
    ],
  },
  {
    path: "/add-user",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddUser />,
      },
    ],
  },
  {
    path: "/add-permission",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddPermissions />,
      },
    ],
  },
  {
    path: "/permission-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <PermissionList/>,
      },
    ],
  },
  {
    path: "/update-permission/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditPermission/>,
      },
    ],
  },
  {
    path: "/user-permissions",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <UserPermissions />,
      },
    ],
  },
  {
    path: "/permissions/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Permissions />,
      },
    ],
  },
  {
    path: "/update-user/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditUser />,
      },
    ],
  },
  {
    path: "/client-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ClientList />,
      },
    ],
  },
  {
    path: "/add-client",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddClient />,
      },
    ],
  },
  {
    path: "/update-client/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditClient />,
      },
    ],
  },
  {
    path: "/client-type-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ClientTypeList />,
      },
    ],
  },
  {
    path: "/add-client-type",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddClientType />,
      },
    ],
  },
  {
    path: "/update-client-type/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditClientType />,
      },
    ],
  },
  {
    path: "/shipment-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ShipmentList />,
      },
    ],
  },
  {
    path: "/add-shipment",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddShipment />,
      },
    ],
  },
  {
    path: "/update-shipment/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditShipment />,
      },
    ],
  },
  {
    path: "/invoice-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <InvoiceList />,
      },
    ],
  },
  {
    path: "/add-invoice",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddInvoice />,
      },
    ],
  },
  {
    path: "/update-invoice/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditInvoice />,
      },
    ],
  },
  {
    path: "/payment-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <PaymentList />,
      },
    ],
  },
  {
    path: "/add-payment",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddPayment />,
      },
    ],
  },
  {
    path: "/update-payment/:id",
    element:<Wrapper />,
    children: [
      {
        index: true,
        element: <EditPayment />,
      },
    ],
  },
  {
    path: "/order-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <OrderList />,
      },
    ],
  },
  {
    path: "/add-order",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddOrder />,
      },
    ],
  },
  {
    path: "/update-order/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditOrder />,
      },
    ],
  },
  {
    path: "/product-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
    ],
  },
  {
    path: "/add-product",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/update-product/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "/expense-list",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <ExpenseList />,
      },
    ],
  },
  {
    path: "/add-expense",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <AddExpense />,
      },
    ],
  },
  {
    path: "/update-expense/:id",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <EditExpense />,
      },
    ],
  },
  
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
function Routes() {
  return (
    // <RefetchProvider>
      <RouterProvider router={router} />
    // </RefetchProvider> 
  );
}

export default Routes;
