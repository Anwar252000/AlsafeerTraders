import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PermissionApi, { useGetPermissionByIdQuery, useUpdatePermissionMutation } from '../../services/apis/Permission';
import { useDispatch } from 'react-redux';

function EditPermission() {
    const { id: permissionId } = useParams();
    const { data: permissionData } = useGetPermissionByIdQuery(permissionId);
    const [ updatePermission ] = useUpdatePermissionMutation();
    const navigate = useNavigate();

    const permissions = permissionData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (permissions) {
          setValue("name", permissions.permissionKey);
          setValue("permissionId", permissions?.permissionId);
     }
      }, [permissions, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                permissionId: formData.permissionId,
                permissionKey: formData.permissionKey,
            };
            await updatePermission({ body: payload }).unwrap();
            toast.success("Permission updated successfully");
            navigate('/permission-list')
            

        } catch (error) {
            toast.error("Failed to update Permission");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Permissions</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Permission's Details</button>
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
                                                        Page URL
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={permissions?.permissionKey || ''}
                                                        {...register('permissionKey', { required: true })}
                                                        
                                                    />

                                                    {/* <input
                                                            type="hidden"
                                                            className="form-control"
                                                            // defaultValue={permissions?.permissionnId || ''}
                                                            {...register('permissionId', { required: true })}
                                                        /> */}
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
                {/*..........End permission Profile !...........  */}
            </main >
        </>
    );
}

export default EditPermission;