import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDeletePermissionMutation, useGetPermissionListQuery } from "../../services/apis/Permission";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";

const PermissionList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: permissionList, error: permissionListError, loading: permissionListLoading, refetch } = useGetPermissionListQuery();
    const [deletePermission] = useDeletePermissionMutation();
    // const [permissionToDelete, setPermissionToDelete] = useState(null);

    if (permissionListLoading) return <div>Loading...</div>;
    if (permissionListError) return <div>Error: {permissionListError.message || 'An error occurred'}</div>;

    const permissionData = permissionList?.data || [];

    if (permissionData == undefined) {
        return <div>No permissions Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && permissionData.length > 0) {
        const initialState = permissionData.reduce((acc, permission) => {
            acc[permission.permissionId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (permissionId, isChecked) => {
        try {
            await deletePermission({ id: permissionId }).unwrap();
            refetch();
            toast.success("Permission status updated successfully");
        } catch (error) {
            toast.error("Failed to update Permission status");
        }
    };

    // const handleDeleteConfirmation = (permissionId) => setPermissionToDelete(permissionId);
    // const handleCancelDelete = () => setPermissionToDelete(null);

    // const handleDelete = async (permissionId) => {
    //     try {
    //     await deletePermission({id: permissionId}).unwrap();
    //     toast.success("Permission deleted successfully");
    //     refetch();
    //     setPermissionToDelete(null);
    //     } catch (error) {
    //     toast.error("Failed to delete Permission");
    //     }
    // };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Permissions List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">User Permissions</li>
                            <li className="breadcrumb-item active">Permissions</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Permissions</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Page URL</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissionData.map((permission, index) => (
                                                    <tr key={permission.permissionId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{permission.permissionKey}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-permission/${permission.permissionId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(permission.permissionId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`permission-${permission.permissionId}`}
                                                                    checked={permission.isActive}
                                                                    onChange={(e) => handleToggleChange(permission.permissionId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`order-${permission.permissionId}`}
                                                                >
                                                                    {permission.isActive ? "Active" : "InActive"}
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* {permissionToDelete && (
                <ConfirmationModal
                    show={permissionToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(permissionToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this Permission?"
                />
            )} */}
        </>
    );
};

export default PermissionList;