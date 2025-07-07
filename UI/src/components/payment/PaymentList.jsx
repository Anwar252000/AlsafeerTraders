import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeletePaymentMutation, useGetPaymentListQuery } from "../../services/apis/Payment";

const PaymentList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: paymentList, error: paymentListError, loading: paymentListLoading, refetch } = useGetPaymentListQuery();
    const [deletePayment] = useDeletePaymentMutation();
    // const [paymentToDelete, setPaymentToDelete] = useState(null);

    if (paymentListLoading) return <div>Loading...</div>;
    if (paymentListError) return <div>Error: {paymentListError.message || 'An error occurred'}</div>;

    const paymentData = paymentList?.data || [];

    if (paymentList == undefined) {
        return <div>No Payments Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && paymentData.length > 0) {
        const initialState = paymentData.reduce((acc, payment) => {
            acc[payment.paymentId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (paymentId, isChecked) => {
        try {
            await deletePayment({ id: paymentId }).unwrap();
            refetch();
            toast.success("Payment status updated successfully");
        } catch (error) {
            toast.error("Failed to update Payment status");
        }
    };

    //   const handleDeleteConfirmation = (paymentId) => setPaymentToDelete(paymentId);
    //   const handleCancelDelete = () => setPaymentToDelete(null);

    //   const handleDelete = async (paymentId) => {
    //     try {
    //       await deletePayment({id: paymentId}).unwrap();
    //       toast.success("Payment deleted successfully");
    //       refetch();
    //       setPaymentToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Payment");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Payment List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Payments</li>
                            <li className="breadcrumb-item active">Payment List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Payments</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead
                                                style={{verticalAlign: "middle"}}
                                            >
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col">Invoice</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Order </th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Partial Payment</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paymentData.map((payment, index) => (
                                                    <tr key={payment.paymentId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{payment.clientName} - {payment.clientTypeName}</td>
                                                        <td>{payment.invoiceName}</td>
                                                        <td>{payment.paymentType}</td>
                                                        <td>{payment.orderName}</td>
                                                        <td>{payment.amount}</td>
                                                        <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                disabled
                                                                checked={payment.partialPayment}
                                                                readOnly
                                                                className="form-check-input fs-5"
                                                                style={{ border: "1px solid grey" }}
                                                            />
                                                        </td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-payment/${payment.paymentId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(payment.paymentId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`payment-${payment.paymentId}`}
                                                                    checked={payment.isActive}
                                                                    onChange={(e) => handleToggleChange(payment.paymentId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`payment-${payment.paymentId}`}
                                                                >
                                                                    {payment.isActive ? "Active" : "InActive"}
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
            {/* {paymentToDelete && (
                <ConfirmationModal
                    show={paymentToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(paymentToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this payment?"
                />
            )} */}
        </>
    );
};

export default PaymentList;