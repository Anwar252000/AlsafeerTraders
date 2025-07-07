import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetClientTypeListQuery } from '../../services/apis/ClientType';
import { toast } from 'react-toastify';
import ShipmentApi, { useAddShipmentMutation } from '../../services/apis/Shipment';
import { useDispatch } from 'react-redux';
import { useGetOrderListQuery } from '../../services/apis/Order';

function AddShipment() {
    const [addShipment] = useAddShipmentMutation();
    const {data: clientTypeList} = useGetClientTypeListQuery();
    const {data: orderList} = useGetOrderListQuery();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                shipmentDate: formData.shipmentDate,
                shipmentFrom: formData.shipmentFrom,
                shipmentTo: formData.shipmentTo,
                shipmentCharges: formData.shipmentCharges,
                clearanceCharges: formData.clearanceCharges,
                portCharges: formData.portCharges,
                miscCharges: formData.miscCharges,
                notes: formData.notes,
                clientTypeId: formData.clientTypeList?.clientTypeId || formData.clientTypeId,
                orderId: formData.orderList?.orderId || formData.orderId
            };
            await addShipment({...payload}).unwrap();
            toast.success("Shipment added successfully");
            navigate('/shipment-list')

        } catch (error) {
            toast.error("Failed to add shipment");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Shipment</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Shipment's Details</button>
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
                                                        Client Type
                                                    </label>
                                                    <select
                                                      className="form-control"
                                                      {...register("clientTypeId", { required: true })}
                                                    >
                                                        {clientTypeList?.data.map((option, index) => (
                                                          <option key={index} value={option.clientTypeId}>{option.clientTypeName}</option>
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
                                                    >
                                                        {orderList?.data.map((option, index) => (
                                                          <option key={index} value={option.orderId}>{option.orderName}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Shipment Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('shipmentDate')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Shipment From
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('shipmentFrom')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Shipment To
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('shipmentTo')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Shipment Charges
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('shipmentCharges')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Clearance Charges
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clearanceCharges')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Port Charges
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('portCharges')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Misc Charges
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('miscCharges')}
                                                    />
                                                </div>

                                                <div className="col-md-12 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Notes
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('notes')}
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

export default AddShipment;