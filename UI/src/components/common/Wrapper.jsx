import SideBar from "./SideBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPermissionApi from "../../services/apis/UserPermission";
import { selectAccessToken, selectPermissions, selectUserId, validateToken } from "../../store/slicer/authSlice";

const Wrapper = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userId = useSelector(selectUserId)
  const permissions = useSelector(selectPermissions);
  // const isAuthenticated = localStorage.getItem("access_token");
  const isAuthenticated = !!accessToken;
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        
          let response = dispatch(UserPermissionApi.endpoints.getUserPermission.initiate(userId));
          let result = await response.unwrap();
          if(result.success){
            dispatch({ type: "auth/setPermissions", payload: result?.data });
          }
      }
      catch (error) {}
    }

    unsubscribe();
  }, [userId]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (accessToken) {
  //       dispatch(validateToken()); // Validates token and refreshes if needed
  //     }
  //   }, 30000); // Run every 30 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [accessToken, dispatch]);

  const hasPermission = () => {
    const currentPath = location.pathname.split("/")[1];
    const permission = permissions?.find((perm) => perm.permissionKey === currentPath);
    return permission?.allowed || false;
  };

  if(isAuthenticated){
    if (!hasPermission() && location.pathname !== "/dashboard") {
      return <Navigate to="/dashboard" />;
    }

      return (
        <>
        <Header />
        <SideBar />
        <Outlet />
        {/* <BackToTopButton/> */}
      </>
    );
  }
  else{

    return <Navigate to="/sign-in" />
  }
};

export default Wrapper;
