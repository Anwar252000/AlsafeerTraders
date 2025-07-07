import { useForm } from 'react-hook-form';
import ClientApi, { useGetClientByIdQuery, useUpdateClientMutation } from '../../services/apis/Client';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function EditClient() {
    const { id: clientId } = useParams();
    const { data: clientData } = useGetClientByIdQuery(clientId);
    const [ updateClient ] = useUpdateClientMutation();
    const navigate = useNavigate();

    const clients = clientData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (clients) {
          setValue("clientName", clients.clientName);
          setValue("clientAddress", clients?.clientAddress);
          setValue("clientEmail", clients?.clientEmail);
          setValue("clientPhoneNumber", clients?.clientPhoneNumber);
          setValue("clientCellNumber", clients?.clientCellNumber);   
          setValue("clientFax", clients?.clientFax);
          setValue("clientTypeId", clients?.clientTypeId);
          setValue("clientId", clients?.clientId);
          setValue("isActive", clients?.isActive);
     }
      }, [clients, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                clientName: formData.clientName,
                clientAddress: formData.clientAddress,
                clientPhoneNumber: formData.clientPhoneNumber,
                clientEmail: formData.clientEmail,
                clientFax: formData.clientFax,
                clientCellNumber: formData.clientCellNumber,
                isActive: formData.isActive,
                clientId: formData.clientId,
                clientTypeId: formData.clientTypeId
            };
            await updateClient({ body: payload }).unwrap();
            toast.success("Client updated successfully");
            navigate('/client-list')
            

        } catch (error) {
            toast.error("Failed to update client");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Client</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Client's Details</button>
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
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clientName')}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefault02"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clientAddress')}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefaultUsername"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Phone Number
                                                    </label>
                                                    <input type="text" className="form-control" id="" 
                                                    {...register('clientPhoneNumber')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Cell Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clientCellNumber')}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault04"
                                                        className="form-label fw-bold"
                                                        id=""
                                                        // value=""
                                                    >
                                                        Client Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clientEmail')}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="validationDefaultUsername"
                                                        className="form-label fw-bold"
                                                        id=""
                                                        // value=""
                                                    >
                                                        Client Fax
                                                    </label>
                                                    <input type="text" className="form-control" id="" 
                                                    {...register('clientFax')}
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

export default EditClient;