import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteUserRoleMutation, useGetUserRoleListQuery } from "../../services/apis/UserRole";

const UserRoleList = () => {
    const { data: roleList, error: roleListError, loading: roleListLoading, refetch } = useGetUserRoleListQuery;
    const [deleteRole] = useDeleteUserRoleMutation();
    const [roleToDelete, setRoleToDelete] = useState(null);
  
    if (roleListLoading ) return <div>Loading...</div>;
    if (roleListError) return <div>Error: {roleListError.message || 'An error occurred'}</div>;

    const roleData = roleList?.data || [];

    if (roleData == undefined) {
        return <div>No Role Available</div>;
    }

  const handleDeleteConfirmation = (roleId) => setRoleToDelete(roleId);
  const handleCancelDelete = () => setRoleToDelete(null);

  const handleRefetch = () => {
    refetch();
  }
  const handleDelete = async (roleId) => {
    try {
      await deleteRole({id: roleId}).unwrap();
      toast.success("Role deleted successfully");
      setRoleToDelete(null);
      handleRefetch();
    } catch (error) {
      toast.error("Failed to delete Role");
    }
  };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Role List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Roles</li>
                            <li className="breadcrumb-item active">Role List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Roles</h5>
                                    <div
                                    style={{overflowX: "auto"}}
                                    >
                                    <table className="table table-bordered" >
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Role Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {roleData.map((role, index) => (
                                            <tr key={role.roleId}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{role.roleName}</td>
                                                <td className="d-flex">
                                                    <Link to={`/update-shipment/${shipment.shipmentId}`}>
                                                    <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                    </Link>
                                                    <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(shipment.shipmentId)}
                                                    >
                                                        Delete
                                                    </button>
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
            {shipmentToDelete && (
            <ConfirmationModal
            show={shipmentToDelete !== null}
            onClose={handleCancelDelete}
            onConfirm={() => handleDelete(shipmentToDelete)}
            title="Delete Confirmation"
            message="Are you sure you want to delete this shipment?"
            />
            )}
        </>
    );
};

export default UserRoleList;