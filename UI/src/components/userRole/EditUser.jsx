import { useForm } from 'react-hook-form';
import { useGetClientByIdQuery, useUpdateClientMutation } from '../../services/apis/Client';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetShipmentByIdQuery, useGetShipmentListQuery, useUpdateShipmentMutation } from '../../services/apis/Shipment';
// import { useRefetch } from '../common/Refetch';

function EditUser() {
    const { id: shipmentId } = useParams();
    const { data: shipmentData } = useGetShipmentByIdQuery(shipmentId);
    const [ updateShipment ] = useUpdateShipmentMutation();
    const navigate = useNavigate();
    
    const shipments = shipmentData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (shipments) {
          setValue("shipmentFrom", shipments.shipmentFrom);
          setValue("shipmentTo", shipments?.shipmentTo);
          const formattedDate = shipments.shipmentDate 
          ? new Date(shipments.shipmentDate).toLocaleDateString('en-CA') : ''; 
          setValue("shipmentDate", formattedDate);
          setValue("shipmentCharges", shipments?.shipmentCharges);
          setValue("clearanceCharges", shipments?.clearanceCharges);   
          setValue("portCharges", shipments?.portCharges);
          setValue("miscCharges", shipments?.miscCharges);
          setValue("notes", shipments?.notes);
          setValue("clientTypeName", shipments?.clientTypeName);
          setValue("clientTypeId", shipments?.clientTypeId);
          setValue("shipmentId", shipments?.shipmentId);
          setValue("isActive", shipments?.isActive);
     }
      }, [shipments, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                shipmentFrom: formData.shipmentFrom,
                shipmentTo: formData.shipmentTo,
                shipmentDate: formData.shipmentDate,
                shipmentCharges: formData.shipmentCharges,
                clearanceCharges: formData.clearanceCharges,
                portCharges: formData.portCharges,
                miscCharges: formData.miscCharges,
                notes: formData.notes,
                isActive: formData.isActive,
                shipmentId: formData.shipmentId,
                clientTypeId: formData.clientTypeId
            };
            await updateShipment({ body: payload }).unwrap();
            toast.success("Shipment updated successfully");
            // refetch();
            navigate('/shipment-list')
            

        } catch (error) {
            console.error('Failed to update shipment: ', error);
            toast.error("Failed to update shipment");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Shipment</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Shipment's Details</button>
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
                                                            Client Type
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={shipments?.clientTypeName || ''}
                                                            readOnly
                                                        />

                                                        <input
                                                            type="hidden" 
                                                            {...register('clientTypeId', { required: true })}
                                                        />
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

export default EditUser;