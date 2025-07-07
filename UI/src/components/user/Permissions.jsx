import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/apis/User";
import { useAddUserPermissionMutation, useGetUserPermissionQuery } from "../../services/apis/UserPermission";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

const Permissions = () => {
    const { id: userId } = useParams();
    const { data: userList } = useGetUserByIdQuery(userId);
    const { data: permissionViewList, refetch } = useGetUserPermissionQuery(userId);
    const [addUserPermissions] = useAddUserPermissionMutation();
    const [toggleStates, setToggleStates] = useState({});
    // const dispatch = useDispatch();

    const usersId = userList?.data?.userId;

    const { register, handleSubmit } = useForm();
    const onSubmit = async (formData) => {
        try {
            const selectedPermissionIds = Object.keys(toggleStates)
            .filter((key) => toggleStates[key]).map((key) => parseInt(key, 10));

            const payload = {
                permissionIds: selectedPermissionIds,
                userId: usersId,
            };
            await addUserPermissions({ ...payload }).unwrap();
            toast.success("User Permissions added successfully");
            // dispatch(UserPermissionApi.endpoints.getUserPermissionList.initiate());
        } catch (error) {
            toast.error("Failed to add User Permissions");
        }
    };

    const userData = userList?.data ? [userList.data] : [];
    const permissionData = permissionViewList?.data ? permissionViewList.data : [];

    useEffect(() => {
        if (permissionData && permissionData.length > 0) {
            const initialToggleStates = {};
            permissionData.forEach((permission) => {
                initialToggleStates[permission.permissionId] = permission.allowed; 
            });
            setToggleStates(initialToggleStates);
        }
    }, [permissionData]);

    const handleToggleChange = (permissionId, isChecked) => {
        setToggleStates((prevState) => ({
            ...prevState,
            [permissionId]: isChecked,
        }));
    };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>User Permissions</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Users</li>
                            <li className="breadcrumb-item active">User Permissions</li>
                            <li className="breadcrumb-item active">Permissions</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of User Permissions</h5>
                                    {userData.map((user, index) => (
                                        <table key={index}>
                                            <thead></thead>
                                            <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td><b>{user.name || "N/A"}</b></td>
                                                <td>/</td>
                                                <td><b>{user.roleName || "N/A"}</b></td>
                                            </tr>
                                            </tbody>
                                      </table>
                                    ))}
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <form className="row g-3 mt-1" onSubmit={handleSubmit(onSubmit)}>
                                            <table className="table table-bordered" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">S.No</th>
                                                        <th scope="col">Page Url</th>
                                                        <th scope="col">Permissions</th>
                                                        {/* <th scope="col">Not Allowed</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {permissionData.map((permission, index) => (
                                                        <tr key={permission.permissionId}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{permission.permissionKey || "N/A"}</td>
                                                            <td className="d-flex">
                                                                <div className="form-check form-switch">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={`permission-${permission.permissionId}`}
                                                                        checked={toggleStates[permission.permissionId] || false}
                                                                        onChange={(e) =>
                                                                            handleToggleChange(permission.permissionId, e.target.checked)
                                                                        }
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor={`permission-${permission.permissionId}`}
                                                                    >
                                                                        {`${toggleStates[permission.permissionId] ? "Allowed" : "Disallowed"
                                                                            }`}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                            <div className="mt-2 text-end">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
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
                </section>
            </main>
        </>
    );
};

export default Permissions;