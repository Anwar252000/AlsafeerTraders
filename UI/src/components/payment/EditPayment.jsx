import { set, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PaymentApi, { useGetPaymentByIdQuery, useUpdatePaymentMutation } from '../../services/apis/Payment';
import { useDispatch } from 'react-redux';

function EditPayment() {
    const { id: paymentId } = useParams();
    const { data: paymentData } = useGetPaymentByIdQuery(paymentId, {skip: false});
    const [ updatePayment ] = useUpdatePaymentMutation();
    const navigate = useNavigate();

    const payments = paymentData?.data || [];

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (payments) {
          const combinedClientDetails = `${payments.clientName || ''} - ${payments.clientTypeName || ''}`;
          setValue("clientDetails", combinedClientDetails);
          setValue("invoiceName", payments?.invoiceName);
          setValue("clientId", payments?.clientId);
          setValue("invoiceId", payments?.invoiceId);
          setValue("amount", payments?.amount);  
          const formattedDate = payments?.paymentDate 
          ? new Date(payments.paymentDate).toLocaleDateString('en-CA') : '';
          setValue("paymentDate", formattedDate);
          setValue("partialPayment", payments?.partialPayment); 
          setValue("paymentType", payments?.paymentType);
          setValue("paymentId", payments?.paymentId);
          setValue("orderId", payments?.orderId);
          setValue("orderName", payments?.orderName);
          setValue("isActive", payments?.isActive);
     }
      }, [payments, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                paymentType: formData.paymentType,
                amount: formData.amount,
                paymentDate: formData.paymentDate,
                partialPayment: formData.partialPayment || false,
                clientId: formData.clientId,
                invoiceId: formData.invoiceId,
                paymentId: formData.paymentId,
                orderId: formData.orderId,
                isActive: formData.isActive,
            };
            await updatePayment({ body: payload }).unwrap();
            toast.success("Payment updated successfully");
            navigate('/payment-list')
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Payment</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Payment's Details</button>
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
                                                        <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                            Client Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={payments ? `${payments.clientName || ''} - ${payments.clientTypeName || ''}` : ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('clientId', { required: true })}
                                                        />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                         <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                            Invoice Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={payments?.invoiceName || ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('invoiceId', { required: true })}
                                                        />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                         <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                            Order Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={payments?.orderName || ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('orderId', { required: true })}
                                                        />
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
                                                        {...register('amount', { required: 'Amount is required' })}/>
                                                </div>
                                                {errors.installment && (<div className="invalid-feedback">{errors.installment.message}</div>)}
                                               
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefault02"
                                                        className="form-label fw-bold"
                                                    >
                                                        Payment Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id=""
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

export default EditPayment;