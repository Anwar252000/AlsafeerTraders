import { useForm } from 'react-hook-form';
import {  useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ClientTypeApi, { useGetClientTypeByIdQuery, useUpdateClientTypeMutation } from '../../services/apis/ClientType';
import { useDispatch } from 'react-redux';

function EditClientType() {
    const { id: clientTypeId } = useParams();
    const { data: clientTypeData } = useGetClientTypeByIdQuery(clientTypeId);
    const [ updateClientType ] = useUpdateClientTypeMutation();
    const navigate = useNavigate();

    const clientType = clientTypeData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (clientType) {
          setValue("clientTypeName", clientType.clientTypeName);
          setValue("clientTypeId", clientType?.clientTypeId);
          setValue("isActive", clientType?.isActive);
     }
      }, [clientType, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                clientTypeName: formData.clientTypeName,
                isActive: formData.isActive,
                clientTypeId: formData.clientTypeId
            };
            await updateClientType({ body: payload }).unwrap();
            toast.success("Client Type updated successfully");
            navigate('/client-type-list')
            
        } catch (error) {
            toast.error("Failed to update client Type");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Client Type</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Client Type Details</button>
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
                                                        Client Type Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('clientTypeName')}
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

export default EditClientType;