import React from "react";
import { useGetOrderListQuery } from "../services/apis/Order";
import { useGetInvoiceListQuery } from "../services/apis/Invoice";
import { useGetShipmentListQuery } from "../services/apis/Shipment";

const Dashboard = () => {
  const {data: orderList} = useGetOrderListQuery();
  const {data: invoiceList} = useGetInvoiceListQuery();
  const {data: shipmentList} = useGetShipmentListQuery();

  const orderData = orderList?.data || [];
  const invoiceData = invoiceList?.data || [];
  const shipmentData = shipmentList?.data || [];

  const countOrders = orderData.filter(order => {
    const orderDate = new Date(order.orderDate);
    const currentDate = new Date();
    return orderDate.getFullYear() === currentDate.getFullYear() &&
           orderDate.getMonth() === currentDate.getMonth();
}).length;

const todayOrders = (orderData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  return orderData.filter(order => {
      const orderDate = new Date(order.orderDate);
      orderDate.setHours(0, 0, 0, 0); 
      return orderDate.getTime() === today.getTime();
  });
};
const totalTodayOrders = todayOrders(orderData);

const countTodayPendingOrders = (orderData) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  return orderData.filter(order => {
      const orderDate = new Date(order.orderDate);
      orderDate.setHours(0, 0, 0, 0); 
      return orderDate.getTime() === today.getTime() && order.orderStatus === "Pending";
  }).length;
};
const pendingOrders = countTodayPendingOrders(orderData);

const countInvoices = invoiceData.filter(invoice => {
  const invoiceDate = new Date(invoice.invoiceDate);
  const currentDate = new Date();
  return invoiceDate.getFullYear() === currentDate.getFullYear() &&
         invoiceDate.getMonth() === currentDate.getMonth();
}).length;

const monthRecentOrders = (orderData) => {  
  return [...orderData]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 2);
};
const recentOrders = monthRecentOrders(orderData);
const monthRecentInvoices = (invoiceData) => {  
  return [...invoiceData]
    .sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate))
    .slice(0, 2);
};
const recentInvoice = monthRecentInvoices(invoiceData);

const monthRecentShipments = (shipmentData) => {  
  return [...shipmentData]
    .sort((a, b) => new Date(b.shipmentDate) - new Date(a.shipmentDate))
    .slice(0, 2);
};
const recentShipment = monthRecentShipments(shipmentData);


  return (
    <>
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">

            <div className="col-lg-8">
              <div className="row">

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    {/* <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div> */}

                    <div className="card-body">
                      <h5 className="card-title">Total Orders <span>| This Month</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{countOrders} Orders</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title">Orders <span>| Today</span> <span>| Pending</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart-fill"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{pendingOrders} Orders</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">Invoices <span>| This Month</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-2">
                          <h6>{countInvoices} Invoices</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="col-12">
                  <div className="card">
                  </div>
                </div>

                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">Pending Orders Details</h5>                       
                      <table className="table table-borderless datatable">
                        <thead >
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Client</th>
                            <th scope="col">Order </th>
                            <th scope="col">Product</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Qty.</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        {totalTodayOrders.map((order, index) => (
                        <tbody key={index}>
                          <tr>
                            <th scope="row">{index+1}</th>
                            <th>{order.clientName}</th>
                            <td>{order.orderName}</td>
                            <td>{order.productName}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.qty}</td>
                            <td>{order.weight}</td>
                            <td><span
                                className={`badge ${
                                  order.orderStatus === 'Pending'
                                    ? 'bg-warning'
                                    : order.orderStatus === 'Delivered'
                                    ? 'bg-success'
                                    : order.orderStatus === 'Cancelled'
                                    ? 'bg-danger'
                                    : ''
                                  }`}
                                >
                                {order.orderStatus}
                                </span>
                            </td>
                          </tr>
                        </tbody>
                         ))}
                      </table>
                      
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Recent Activity <span>| Top 2 Results</span></h5>
                  <div className="activity">
                    {recentOrders.map((order, index) => (
                    <div className="activity-item d-flex" key={index}>
                      <div className="activite-label">Orders</div>
                      <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                      <div className="activity-content">
                        {order.clientName} | {order.orderName} | {order.productName} | {order.qty}
                      </div>
                    </div>
                    ))}
                    {recentInvoice.map((invoice, index) => (
                    <div className="activity-item d-flex"  key={index}>
                      <div className="activite-label">Invoices</div>
                      <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                      <div className="activity-content">
                        {invoice.invoiceName} | {invoice.clientName} | {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </div>
                    </div>
                    ))}

                    {recentShipment.map((ship, index) => (
                    <div className="activity-item d-flex" key={index}>
                      <div className="activite-label">Shipments</div>
                      <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                      <div className="activity-content">
                      {ship.clientTypeName} | {ship.shipmentFrom} | {ship.shipmentTo} | {new Date(ship.shipmentDate).toLocaleDateString()}
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
