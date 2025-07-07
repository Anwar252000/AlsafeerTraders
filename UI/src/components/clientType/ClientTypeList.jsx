import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteClientTypeMutation, useGetClientTypeListQuery } from "../../services/apis/ClientType";

const ClientTypeList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: clientTypeList, error: clientTypeListError, loading: clientTypeListLoading, refetch } = useGetClientTypeListQuery();
    const [deleteClientType] = useDeleteClientTypeMutation();
    // const [clientTypeToDelete, setClientTypeToDelete] = useState(null);

    if (clientTypeListLoading) return <div>Loading...</div>;
    if (clientTypeListError) return <div>Error: {clientTypeListError.message || 'An error occurred'}</div>;

    const clientType = clientTypeList?.data || [];

    if (clientType == undefined) {
        return <div>No Client Types Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && clientType.length > 0) {
        const initialState = clientType.reduce((acc, client) => {
            acc[client.clientTypeId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (clientTypeId, isChecked) => {
        try {
            await deleteClientType({ id: clientTypeId }).unwrap();
            refetch();
            toast.success("Client Type status updated successfully");
        } catch (error) {
            toast.error("Failed to update Client Type status");
        }
    };
    //   const handleDeleteConfirmation = (clientTypeId) => setClientTypeToDelete(clientTypeId);
    //   const handleCancelDelete = () => setClientTypeToDelete(null);

    //   const handleDelete = async (clientTypeId) => {
    //     try {
    //       await deleteClientType({id: clientTypeId}).unwrap();
    //       toast.success("Client Type deleted successfully");
    //       refetch();
    //       setClientTypeToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete client Type");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Client List Type</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Client Type</li>
                            <li className="breadcrumb-item active">Client Type List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Client Types</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Client Type Name</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientType.map((client, index) => (
                                                    <tr key={client.clientTypeId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{client.clientTypeName}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-client-type/${client.clientTypeId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteConfirmation(client.clientTypeId)}
                                                            >
                                                                Delete
                                                            </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`client-${client.clientTypeId}`}
                                                                    checked={client.isActive}
                                                                    onChange={(e) => handleToggleChange(client.clientTypeId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`client-${client.clientTypeId}`}
                                                                >
                                                                    {client.isActive ? "Active" : "InActive"}
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
            </main >
            {/* {clientTypeToDelete && (
                <ConfirmationModal
                    show={clientTypeToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(clientTypeToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this Client Type?"
                />
            )} */}
        </>
    );
};

export default ClientTypeList;