import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InvoiceApi, { useAddInvoiceMutation, useGetInvoiceListQuery } from '../../services/apis/Invoice';
import { useGetClientListQuery } from '../../services/apis/Client';
import { useDispatch } from 'react-redux';
import { useGetOrderListQuery } from '../../services/apis/Order';
import { useState } from 'react';

function AddInvoice() {
    const [addInvoice] = useAddInvoiceMutation();
    const { data: clientList } = useGetClientListQuery();
    const { data: orderList } = useGetOrderListQuery();
    const { data: invoiceList } = useGetInvoiceListQuery();
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [duplicateInvoice, setDuplicateInvoice] = useState(null);
    const navigate = useNavigate();

    const handleOrderChange = (event) => {
        const selectedId = event.target.value;
        const duplicate = invoiceList?.data.find(
            (invoice) => invoice.orderId === parseInt(selectedId)
        );
        setIsDuplicate(!!duplicate);
        setDuplicateInvoice(duplicate || null);
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                invoiceName: formData.invoiceName,
                invoiceDate: formData.invoiceDate,
                invoiceAmount: formData.invoiceAmount,
                clientId: formData.clientList?.clientId || formData.clientId,
                orderId: formData.orderList?.orderId || formData.orderId
            };
            await addInvoice({ ...payload }).unwrap();
            toast.success("Invoice added successfully");
            navigate('/invoice-list')

        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Invoice</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Invoice Details</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content pt-1">
                                        <div
                                            className="tab-pane fade show active"
                                            id="std-details"
                                        >
                                            <form className="row g-3 mt-1" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Name
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        {...register("clientId", { required: true })}
                                                    >
                                                        {clientList?.data.map((option, index) => (
                                                            <option key={index} value={option.clientId}>{option.clientName} - {option.clientTypeName}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Order Name
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        {...register("orderId", { required: true })}
                                                        onChange={(e) => {
                                                            handleOrderChange(e);
                                                        }}
                                                    >
                                                        <option value="">Select Order</option>
                                                        {orderList?.data.map((option, index) => (
                                                            <option key={index} value={option.orderId}>
                                                                {option.orderName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Invoice Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('invoiceDate')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Invoice Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('invoiceName')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Invoice Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('invoiceAmount')}
                                                    />
                                                </div>

                                                <div className="col-12 text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Save Form
                                                    </button>
                                                </div>
                                            </form>
                                            {isDuplicate && duplicateInvoice && (
                                                console.log("invoice data",duplicateInvoice),
                                                <div className="mt-4">
                                                    <small className="text-danger">
                                                        Note: An invoice for the selected <b>"Order Name"</b> already exists.
                                                    </small>
                                                    <table className="table mt-3">
                                                        <thead>
                                                            <tr>
                                                                <th>Client Name</th>
                                                                <th>Order Name</th>
                                                                <th>Invoice Name</th>
                                                                <th>Invoice Date</th>
                                                                <th>invoice Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{duplicateInvoice.clientName} - {duplicateInvoice.clientTypeName}</td>
                                                                <td>{duplicateInvoice.orderName}</td>
                                                                <td>{duplicateInvoice.invoiceName}</td>
                                                                <td>{new Date(duplicateInvoice.invoiceDate).toLocaleDateString()}</td>
                                                                <td>{duplicateInvoice.invoiceAmount}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                {/*..........End User Profile !...........  */}
            </main >
        </>
    );
}

export default AddInvoice;