import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserApi, { useGetUserByIdQuery, useUpdateUserMutation } from '../../services/apis/User';
import { useDispatch } from 'react-redux';
import UserRoleApi, { useGetUserRoleListQuery } from '../../services/apis/UserRole';

function EditUser() {
    const { id: userId } = useParams();
    const { data: userData } = useGetUserByIdQuery(userId);
    const [updateUser] = useUpdateUserMutation();
    const { data: roleData } = useGetUserRoleListQuery();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const users = userData?.data || [];
    const roles = roleData?.data || [];

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        if (users) {
            setValue("name", users.name);
            setValue("userName", users?.username);
            setValue("roleName", users?.roleName);
            setValue("roleId", users?.roleId);
            setValue("userId", users?.userId);
            setValue("password", users?.password);
        }
    }, [users, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = {
                userId: formData.userId,
                roleId: formData.roleId,
                userName: formData.username,
                password: formData.password,
                name: formData.name,
            };
            await updateUser({ body: payload }).unwrap();
            toast.success("User updated successfully");
            navigate('/user-list')
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update User</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update User's Details</button>
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
                                                        Full Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={users?.name || ''}
                                                        {...register('name', { required: true })}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                        Username
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={users?.username || ''}
                                                        {...register('username', { required: true })}
                                                        readOnly
                                                    />

                                                    <input
                                                        type="hidden"
                                                        {...register('userId', { required: true })}
                                                    />

                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                        Role Name
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        {...register('roleId', { required: true })}
                                                    >
                                                        {roles.map((role) => (
                                                            <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label htmlFor="validationDefault01" className="form-label fw-bold">
                                                        Password
                                                    </label>
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control"
                                                            value={users?.password || ''} // Display the first 10 characters
                                                            {...register('password', { required: true })}
                                                        />
                                                        <span
                                                            onClick={togglePasswordVisibility}
                                                            style={{
                                                                position: 'absolute',
                                                                right: '10px',
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                cursor: 'pointer',
                                                                color: '#6c757d',
                                                                id: '1'
                                                            }}
                                                        >
                                                            {showPassword ? (
                                                                <i className="fas fa-eye"></i>
                                                            ) : (
                                                                <i className="fas fa-eye-slash"></i>
                                                            )}
                                                        </span>
                                                    </div>
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