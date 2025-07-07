import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderApi, { useAddOrderMutation } from '../../services/apis/Order';
import { useGetClientListQuery } from '../../services/apis/Client';
import { useGetProductListQuery } from '../../services/apis/Product';
import { useDispatch } from 'react-redux';
import { useGetClientTypeListQuery } from '../../services/apis/ClientType';

function AddOrder() {
    const [addOrder] = useAddOrderMutation();
    const { data: clientList } = useGetClientListQuery();
    const { data: productList } = useGetProductListQuery();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue,formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                orderName: formData.orderName,
                orderDate: formData.orderDate,
                orderStatus: formData.orderStatus,
                qty: formData.qty,
                weight: formData.weight,
                productId: formData.productList?.productId || formData.productId,
                clientId: formData.clientList?.clientId || formData.clientId,
            };

            await addOrder({ ...payload }).unwrap();
            toast.success("Order added successfully");
            navigate('/order-list')

        } catch (error) {
            toast.error("Failed to add Order");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Orders</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Orders' Details</button>
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
                                                    <select
                                                    type="text"
                                                    className="form-control"
                                                    {...register('orderStatus', { required: 'Order Status is required' })}>
                                                    {/* {...setValue('orderStatus')} */}
                                                        <option value="">Select Order Status</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                {errors.orderStatus && (<div className="invalid-feedback">{errors.orderStatus.message}</div>)}

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
                                                        Product Name
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        {...register("productId", { required: true })}
                                                    >
                                                        {productList?.data.map((option, index) => (
                                                            <option key={index} value={option.productId}>{option.productName}</option>
                                                        ))}
                                                    </select>
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

export default AddOrder;