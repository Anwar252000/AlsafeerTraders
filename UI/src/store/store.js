import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ClientApi } from "../services/apis/Client";
import { ClientTypeApi } from "../services/apis/ClientType";
import ShipmentApi from "../services/apis/Shipment";
import InvoiceApi from "../services/apis/Invoice";
import PaymentApi from "../services/apis/Payment";
import ProductApi from "../services/apis/Product";
import ExpenseApi from "../services/apis/Expense";
import OrderApi from "../services/apis/Order";
import UserApi from "../services/apis/User";
import UserRoleApi from "../services/apis/UserRole";
import authReducer from "/src/store/slicer/authSlice";
import PermissionApi from "../services/apis/Permission";
import UserPermissionApi from "../services/apis/UserPermission";
import RefreshTokenApi from "../services/apis/RefreshToken";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [ClientApi.reducerPath]: ClientApi.reducer,
    [ClientTypeApi.reducerPath]: ClientTypeApi.reducer,
    [ShipmentApi.reducerPath]: ShipmentApi.reducer,
    [InvoiceApi.reducerPath]: InvoiceApi.reducer,
    [PaymentApi.reducerPath]: PaymentApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [ExpenseApi.reducerPath]: ExpenseApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [UserRoleApi.reducerPath]: UserRoleApi.reducer,
    [PermissionApi.reducerPath]: PermissionApi.reducer,
    [UserPermissionApi.reducerPath]: UserPermissionApi.reducer,
    [RefreshTokenApi.reducerPath]: RefreshTokenApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ClientApi.middleware).concat(ClientTypeApi.middleware)
  .concat(ShipmentApi.middleware).concat(InvoiceApi.middleware).concat(PaymentApi.middleware)
  .concat(ProductApi.middleware).concat(ExpenseApi.middleware).concat(OrderApi.middleware)
  .concat(UserApi.middleware).concat(UserRoleApi.middleware).concat(PermissionApi.middleware)
  .concat(UserPermissionApi.middleware).concat(RefreshTokenApi.middleware)
});

setupListeners(store.dispatch);

export default store;
