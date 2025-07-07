import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import InvoiceApi, { useGetInvoiceByIdQuery, useUpdateInvoiceMutation } from '../../services/apis/Invoice';
import { useDispatch } from 'react-redux';

function EditInvoice() {
    const { id: invoiceId } = useParams();
    const { data: invoiceData } = useGetInvoiceByIdQuery(invoiceId);
    const [ updateInvoice ] = useUpdateInvoiceMutation();
    const navigate = useNavigate();

    const invoices = invoiceData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (invoices) {
          setValue("invoiceName", invoices.invoiceName);
          setValue("invoiceAmount", invoices?.invoiceAmount);
          const formattedDate = invoices.invoiceDate 
          ? new Date(invoices.invoiceDate).toLocaleDateString('en-CA') : '';
          setValue("invoiceDate", formattedDate);
          const combinedClientDetails = `${invoices.clientName || ''} - ${invoices.clientTypeName || ''}`;
          setValue("clientDetails", combinedClientDetails);
          setValue("clientId", invoices?.clientId);
          setValue("orderName", invoices.orderName);
          setValue("orderId", invoices?.orderId);
          setValue("invoiceId", invoices?.invoiceId);
          setValue("isActive", invoices?.isActive);
     }
      }, [invoices, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                invoiceName: formData.invoiceName,
                invoiceAmount: formData.invoiceAmount,
                invoiceDate: formData.invoiceDate,
                clientName: formData.clientName,
                clientId: formData.clientId,
                orderName: formData.orderName,
                orderId: formData.orderId,
                isActive: formData.isActive,
                invoiceId: formData.invoiceId,
            };
            await updateInvoice({ body: payload }).unwrap();
            toast.success("Invoice updated successfully");
            navigate('/invoice-list')

        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Invoice</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Invoice Details</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content pt-1">
                                        <div
                                            className="tab-pane fade show active"
                                            id="std-details"
                                        >
                                            <form className="row g-3 mt-1" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="col-md-6 mb-2">
                                                        <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                            Client Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={invoices ? `${invoices.clientName || ''} - ${invoices.clientTypeName || ''}` : ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('clientId', { required: true })}
                                                        />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                        <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                            Order Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={invoices?.orderName || ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('orderId', { required: true })}
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
                                                        {...register('invoiceName')}
                                                    />
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
                                                        {...register('invoiceDate')}
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

export default EditInvoice;