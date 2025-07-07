import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import OrderApi, { useGetOrderByIdQuery, useUpdateOrderMutation } from '../../services/apis/Order';
import { useDispatch } from 'react-redux';

function EditOrder() {
    const { id: orderId } = useParams();
    const { data: orderData } = useGetOrderByIdQuery(orderId);
    const [ updateorder ] = useUpdateOrderMutation();
    const navigate = useNavigate();

    const orders = orderData?.data || [];

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (orders) {
          setValue("orderId", orders.orderId);
          setValue("orderName", orders.orderName);
          const formattedDate = orders.orderDate 
          ? new Date(orders.orderDate).toLocaleDateString('en-CA') : ''; 
          setValue("orderDate", formattedDate);
          setValue("orderStatus", orders?.orderStatus);
          setValue("qty", orders?.qty);
          setValue("weight", orders?.weight);
          setValue("productId", orders?.productId);
          setValue("productName", orders?.productName);
          setValue("clientId", orders?.clientId);
          const combinedClientDetails = `${orders.clientName || ''} - ${orders.clientTypeName || ''}`;
          setValue("clientDetails", combinedClientDetails);
          setValue("isActive", orders?.isActive);
     }
      }, [orders, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                orderId: formData.orderId,
                orderName: formData.orderName,
                orderDate: formData.orderDate,
                orderStatus: formData.orderStatus,
                qty: formData.qty,
                weight: formData.weight,
                productId: formData.productList?.productId || formData.productId,
                clientId: formData.clientList?.clientId || formData.clientId,
                isActive: formData.isActive,
            };
            await updateorder({ body: payload }).unwrap();
            toast.success("order updated successfully");
            navigate('/order-list')

        } catch (error) {
            toast.error("Failed to update order");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Order</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Order's Details</button>
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
                                                        Order Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('orderName', { required: 'Order Name is required' })} />
                                                </div>
                                                {errors.orderName && (<div className="invalid-feedback">{errors.orderName.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Order Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('orderDate', { required: 'Order Date is required' })} />
                                                </div>
                                                {errors.orderDate && (<div className="invalid-feedback">{errors.orderDate.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Order Qty.
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('qty', { required: 'Order Quantity is required' })} />
                                                </div>
                                                {errors.qty && (<div className="invalid-feedback">{errors.qty.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Order Weight
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('weight', { required: 'Order Weight is required' })} />
                                                </div>
                                                {errors.weight && (<div className="invalid-feedback">{errors.weight.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Status
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('orderStatus', { required: 'Order Status is required' })} />
                                                </div>
                                                {errors.orderStatus && (<div className="invalid-feedback">{errors.orderStatus.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={orders ? `${orders.clientName || ''} - ${orders.clientTypeName || ''}` : ''}
                                                        readOnly
                                                        />
                                                    <input
                                                            type="hidden" 
                                                            {...register('clientId', { required: true })}
                                                        />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Product Name
                                                    </label>
                                                    <input
                                                            type="text"
                                                            className="form-control"
                                                            value={orders?.productName || ''}
                                                            readOnly
                                                        />
                                                    <input
                                                            type="hidden" 
                                                            {...register('productId', { required: true })}
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

export default EditOrder;