import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaymentApi, { useAddPaymentMutation, useGetPaymentListQuery } from '../../services/apis/Payment';
import { useGetClientListQuery } from '../../services/apis/Client';
import { useGetInvoiceListQuery } from '../../services/apis/Invoice';
import { useDispatch } from 'react-redux';
import { useGetOrderListQuery } from '../../services/apis/Order';
import { useState } from 'react';

function AddPayment() {
    const [addPayment] = useAddPaymentMutation();
    const { data: clientList } = useGetClientListQuery();
    const { data: invoiceList } = useGetInvoiceListQuery();
    const { data: orderList } = useGetOrderListQuery();
    const { data: paymentList } = useGetPaymentListQuery();
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [duplicatePayment, setDuplicatePayment] = useState(null);
    const navigate = useNavigate();

    const handleOrderChange = (event) => {
        const selectedId = event.target.value;
        const duplicate = paymentList?.data.find(
            (payment) => payment.orderId === parseInt(selectedId)
        );
        setIsDuplicate(!!duplicate);
        setDuplicatePayment(duplicate || null);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                paymentType: formData.paymentType,
                amount: formData.amount,
                paymentDate: formData.paymentDate,
                clientId: formData.clientList?.clientId || formData.clientId,
                invoiceId: formData.invoiceList?.invoiceId || formData.invoiceId,
                orderId: formData.orderList?.orderId || formData.orderId,
                partialPayment: formData.partialPayment || false,
            };
            await addPayment({ ...payload }).unwrap();
            toast.success("Payment added successfully");
            navigate('/payment-list')

        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Payments</h1>
                </div>
                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Payments' Details</button>
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
                                                        Payment Type
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        {...register('paymentType', { required: 'Payment Type is required' })}
                                                    >
                                                        <option value="">Select Payment Type</option>
                                                        <option>Cash</option>
                                                        <option>Cheque</option>
                                                        <option>Online Transfer</option>
                                                    </select>
                                                </div>
                                                {errors.paymentType && (<div className="invalid-feedback">{errors.paymentType.message}</div>)}

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
                                                        Invoice Name
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        {...register("invoiceId", { required: true })}
                                                    >
                                                        {invoiceList?.data.map((option, index) => (
                                                            <option key={index} value={option.invoiceId}>{option.invoiceName}</option>
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
                                                            <option key={index} value={option.orderId}>{option.orderName}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefault02"
                                                        className="form-label fw-bold"
                                                    >
                                                        Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('amount', { required: 'Amount is required' })} />
                                                </div>
                                                {errors.amount && (<div className="invalid-feedback">{errors.amount.message}</div>)}

                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefault02"
                                                        className="form-label fw-bold"
                                                    >
                                                        Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id=""
                                                        // value="
                                                        {...register('paymentDate', { required: 'Date is required' })} />
                                                </div>
                                                {errors.date && (<div className="invalid-feedback">{errors.date.message}</div>)}

                                                <div className="col-md-12 mb-2 form-check ms-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input "
                                                        id="partialPaymentCheckbox"
                                                        {...register('partialPayment')}
                                                    />
                                                    <label
                                                        htmlFor="partialPaymentCheckbox"
                                                        className="form-check-label fw-bold"
                                                    >
                                                        Partial Payment
                                                    </label>
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
                                            {isDuplicate && duplicatePayment && (
                                                <div className="mt-4">
                                                    <small className="text-danger">
                                                        Note: A Payment for the selected <b>"Order Name"</b> already exists.
                                                    </small>
                                                    <table className="table mt-3">
                                                        <thead>
                                                            <tr>
                                                                <th>Client Name</th>
                                                                <th>Invoice Name</th>
                                                                <th>Payment Type</th>
                                                                <th>Order Name</th>
                                                                <th>Invoice Amount</th>
                                                                <th>Payment Date</th>
                                                                <th>Partial Payment</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{duplicatePayment.clientName} - {duplicatePayment.clientTypeName}</td>
                                                                <td>{duplicatePayment.invoiceName}</td>
                                                                <td>{duplicatePayment.paymentType}</td>
                                                                <td>{duplicatePayment.orderName}</td>
                                                                <td>{duplicatePayment.amount}</td>
                                                                <td>{new Date(duplicatePayment.paymentDate).toLocaleDateString()}</td>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        disabled
                                                                        checked={duplicatePayment.partialPayment}
                                                                        readOnly
                                                                        className="form-check-input fs-5"
                                                                        style={{ border: "1px solid grey" }}
                                                                    />
                                                                </td>
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

export default AddPayment;