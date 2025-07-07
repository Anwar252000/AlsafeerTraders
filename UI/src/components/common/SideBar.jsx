import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPermissions } from "../../store/slicer/authSlice";

const SideBar = () => {
  const permissions = useSelector(selectPermissions);
 
  const handleLinkClick = () => {
    const bodyElement = document.querySelector("body");
    bodyElement.classList.remove("toggle-sidebar");
  };

  useEffect(() => {
    const toggleButton = document.querySelector(".toggle-sidebar-btn");
    const bodyElement = document.querySelector("body");

    const toggleSidebar = () => {
      bodyElement.classList.toggle("toggle-sidebar");
    };

    if (toggleButton) {
      toggleButton.addEventListener("click", toggleSidebar);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);

  const hasPermission = (permissionKey) => {
    const permission = permissions.find((perm) => perm.permissionKey === permissionKey);
    return permission ? permission.allowed : false;
  };

  return (
    <>
      <button className="toggle-sidebar-btn">Toggle Sidebar</button>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard" onClick={handleLinkClick}>
              <i className="bi bi-grid "></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#user-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Users</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="user-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-user") && (
              <li>
                <Link to="/add-user" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add User</span>
                </Link>
              </li>
              )}
               
               {hasPermission("user-list") && (
              <li>
                <Link to="/user-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>User List</span>
                </Link>
              </li>  
               )}      
            </ul>
          </li>
          {/* )} */}


          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#permission-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              
              <i className="bi bi-menu-button-wide"></i>
              <span>User Permissions</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="permission-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-permission") && (
              <li>
                <Link to="/add-permission" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Permission</span>
                </Link>
              </li>
              )}

              {hasPermission("permission-list") && (
              <li>
                <Link to="/permission-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Permissions List</span>
                </Link>
              </li>
              )}

              {hasPermission("user-permissions") && (
              <li>
                <Link to="/user-permissions" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>User Permissions</span>
                </Link>
              </li>
              )}

            </ul>
          </li>
          {/* )} */}

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#client-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Client</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="client-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-client") && (
              <li>
                <Link to="/add-client" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Client</span>
                </Link>
              </li>
              )}

              {hasPermission("add-client-type") && (
              <li>
                <Link to="/add-client-type" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Client Type</span>
                </Link>
              </li>
              )}
              {hasPermission("client-list") && (
              <li>
                <Link to="/client-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Client List</span>
                </Link>
              </li>
              )}
              {hasPermission("client-type-list") && (
              <li>
                <Link to="/client-type-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Client Type List</span>
                </Link>
              </li>  
              )}            
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#product-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Products</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="product-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-product") && (
              <li>
                <Link to="/add-product" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Product</span>
                </Link>
              </li>
              )}
              {hasPermission("product-list") && (
              <li>
                <Link to="/product-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Product List</span>
                </Link>
              </li>
              )}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#shipment-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Shipment</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="shipment-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-shipment") && (
              <li>
                <Link to="/add-shipment" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Shipment</span>
                </Link>
              </li>
              )}
              {hasPermission("shipment-list") && (
              <li>
                <Link to="/shipment-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Shipment List</span>
                </Link>
              </li>
              )}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#order-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Orders</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="order-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-order") && (
              <li>
                <Link to="/add-order" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Order</span>
                </Link>
              </li>
              )}
              {hasPermission("order-list") && (
              <li>
                <Link to="/order-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>View Orders</span>
                </Link>
              </li>
              )}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#expense-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Expenses</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="expense-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-expense") && (
              <li>
                <Link to="/add-expense" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Expense</span>
                </Link>
              </li>
              )}
              {hasPermission("expense-list") && (
              <li>
                <Link to="/expense-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Expense Schedule</span>
                </Link>
              </li>
              )}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#payments-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Payments</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="payments-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-payment") && (
              <li>
                <Link to="/add-payment" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Payments</span>
                </Link>
              </li>
              )}
              {hasPermission("payment-list") && (
              <li>
                <Link to="/payment-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>View Payments</span>
                </Link>
              </li>
              )}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#invoice-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Invoices</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="invoice-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              {hasPermission("add-invoice") && (
              <li>
                <Link to="/add-invoice" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Add Invoice</span>
                </Link>
              </li>
              )}
              {hasPermission("invoice-list") && (
              <li>
                <Link to="/invoice-list" onClick={handleLinkClick}>
                  <i className="bi bi-circle"></i>
                  <span>Invoice Schedule</span>
                </Link>
              </li>
              )}
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
