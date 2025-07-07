import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteOrderMutation, useGetOrderListQuery } from "../../services/apis/Order";

const OrderList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: orderList, error: orderListError, loading: orderListLoading, refetch } = useGetOrderListQuery();
    const [deleteOrder] = useDeleteOrderMutation();
    // const [orderToDelete, setOrderToDelete] = useState(null);

    if (orderListLoading) return <div>Loading...</div>;
    if (orderListError) return <div>Error: {orderListError.message || 'An error occurred'}</div>;

    const orderData = orderList?.data || [];

    if (orderList == undefined) {
        return <div>No Orders Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && orderData.length > 0) {
        const initialState = orderData.reduce((acc, order) => {
            acc[order.orderId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (orderId, isChecked) => {
        try {
            await deleteOrder({ id: orderId }).unwrap();
            refetch();
            toast.success("Order status updated successfully");
        } catch (error) {
            toast.error("Failed to update Order status");
        }
    };

    //   const handleDeleteConfirmation = (orderId) => setOrderToDelete(orderId);
    //   const handleCancelDelete = () => setOrderToDelete(null);

    //   const handleDelete = async (orderId) => {
    //     try {
    //       await deleteOrder({id: orderId}).unwrap();
    //       toast.success("Order deleted successfully");
    //       refetch();
    //       setOrderToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Order");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Order List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Orders</li>
                            <li className="breadcrumb-item active">Order List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Orders</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead
                                                style={{verticalAlign: "middle"}}
                                            >
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Order</th>
                                                    <th scope="col">Client </th>
                                                    <th scope="col">Product </th>
                                                    <th scope="col">Order Date</th>
                                                    <th scope="col">Order Status</th>
                                                    <th scope="col">Qty.</th>
                                                    <th scope="col">Weight</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderData.map((order, index) => (
                                                    <tr key={order.orderId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{order.orderName}</td>
                                                        <td>{order.clientName} - {order.clientTypeName}</td>
                                                        <td>{order.productName}</td>
                                                        <td>{order.orderDate.split("T")[0]}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td>{order.qty}</td>
                                                        <td>{order.weight}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-order/${order.orderId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(order.orderId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`order-${order.orderId}`}
                                                                    checked={order.isActive}
                                                                    onChange={(e) => handleToggleChange(order.orderId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`order-${order.orderId}`}
                                                                >
                                                                    {order.isActive ? "Active" : "InActive"}
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* {orderToDelete && (
            <ConfirmationModal
            show={orderToDelete !== null}
            onClose={handleCancelDelete}
            onConfirm={() => handleDelete(orderToDelete)}
            title="Delete Confirmation"
            message="Are you sure you want to delete this Order?"
            />
            )} */}
        </>
    );
};

export default OrderList;