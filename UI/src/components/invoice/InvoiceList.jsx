import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteInvoiceMutation, useGetInvoiceListQuery } from "../../services/apis/Invoice";

const InvoiceList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: invoiceList, error: invoiceListError, loading: invoiceListLoading, refetch } = useGetInvoiceListQuery();
    const [deleteInvoice] = useDeleteInvoiceMutation();
    // const [invoiceToDelete, setInvoiceToDelete] = useState(null);

    if (invoiceListLoading) return <div>Loading...</div>;
    if (invoiceListError) return <div>Error: {invoiceListError.message || 'An error occurred'}</div>;

    const invoiceData = invoiceList?.data || [];

    if (invoiceData == undefined) {
        return <div>No Invoices Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && invoiceData.length > 0) {
        const initialState = invoiceData.reduce((acc, invoice) => {
            acc[invoice.invoiceId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (invoiceId, isChecked) => {
        try {
            await deleteInvoice({ id: invoiceId }).unwrap();
            refetch();
            toast.success("Invoice status updated successfully");
        } catch (error) {
            toast.error("Failed to update Invoice status");
        }
    };

    //   const handleDeleteConfirmation = (invoiceId) => setInvoiceToDelete(invoiceId);
    //   const handleCancelDelete = () => setInvoiceToDelete(null);

    //   const handleDelete = async (invoiceId) => {
    //     try {
    //       await deleteInvoice({id: invoiceId}).unwrap();
    //       toast.success("Invoice deleted successfully");
    //       refetch();
    //       setInvoiceToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Invoice");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Invoice List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Invoices</li>
                            <li className="breadcrumb-item active">Invoice List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Invoices</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col">Order</th>
                                                    <th scope="col">Invoice</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoiceData.map((invoice, index) => (
                                                    <tr key={invoice.invoiceId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{invoice.clientName} - {invoice.clientTypeName}</td>
                                                        <td>{invoice.orderName}</td>
                                                        <td>{invoice.invoiceName}</td>
                                                        <td>{new Date(invoice.invoiceDate).toLocaleDateString('en-CA')}</td>
                                                        <td>{invoice.invoiceAmount}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-invoice/${invoice.invoiceId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(invoice.invoiceId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`invoice-${invoice.invoiceId}`}
                                                                    checked={invoice.isActive}
                                                                    onChange={(e) => handleToggleChange(invoice.invoiceId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`invoice-${invoice.invoiceId}`}
                                                                >
                                                                    {invoice.isActive ? "Active" : "InActive"}
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
            {/* {invoiceToDelete && (
                <ConfirmationModal
                    show={invoiceToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(invoiceToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this invoice?"
                />
            )} */}
        </>
    );
};

export default InvoiceList;