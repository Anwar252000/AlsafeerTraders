import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PermissionApi, useAddPermissionMutation } from '../../services/apis/Permission';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../store/slicer/authSlice';

function AddPermissions() {
    const [addPermissions] = useAddPermissionMutation();
    const navigate = useNavigate();
    const userId = useSelector(selectUserId)

    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                permissionKey: formData.permissionKey,
            };
            await addPermissions({...payload}).unwrap();
            toast.success("Permission added successfully");
            navigate('/permission-list')
        } catch (error) {
            toast.error("Failed to add Permission");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Permission</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Permission's Details</button>
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
                                                        Page Url
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('permissionKey')}
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

export default AddPermissions;