import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserRoleApi, { useGetUserRoleListQuery } from '../../services/apis/UserRole';
import UserApi, { useAddUserMutation } from '../../services/apis/User';
import { useDispatch } from 'react-redux';

function AddUser() {
    const [addUser] = useAddUserMutation();
    const {data: UserRoleList, refetch} = useGetUserRoleListQuery();
    const navigate = useNavigate();

    const userRoles = UserRoleList?.data || [];

    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = {
                userName: formData.username,
                password: formData.password,
                name: formData.name,
                roleId: formData.UserRoleList?.roleId || formData.roleId
            };
            await addUser({...payload}).unwrap();
            toast.success("User added successfully");
            navigate('/user-list')

        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add User</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In User's Details</button>
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
                                                        User Full Name 
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('name')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('username')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id=""
                                                        // value=""
                                                        {...register('password')}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Role Name
                                                    </label>
                                                    <select
                                                      className="form-control"
                                                      {...register("roleId", { required: true })}
                                                    >
                                                        {userRoles?.map((option, index) => (
                                                          <option key={index} value={option.roleId}>{option.roleName}</option>
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

export default AddUser;