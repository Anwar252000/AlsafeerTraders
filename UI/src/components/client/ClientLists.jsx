import React, { useState } from "react";
import { useDeleteClientMutation, useGetClientListQuery } from "../../services/apis/Client";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";

const ClientList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: clientList, error: clientListError, loading: clientListLoading, refetch } = useGetClientListQuery();
    const [deleteClient] = useDeleteClientMutation();
    // const [clientToDelete, setClientToDelete] = useState(null);

    if (clientListLoading) return <div>Loading...</div>;
    if (clientListError) return <div>Error: {clientListError.message || 'An error occurred'}</div>;

    const clientData = clientList?.data || [];

    if (clientList == undefined) {
        return <div>No Clients Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && clientData.length > 0) {
        const initialState = clientData.reduce((acc, client) => {
            acc[client.clientId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (clientId, isChecked) => {
        try {
            await deleteClient({ id: clientId }).unwrap();
            refetch();
            toast.success("Client status updated successfully");
        } catch (error) {
            toast.error("Failed to update Client status");
        }
    };

    //   const handleDeleteConfirmation = (clientId) => setClientToDelete(clientId);
    //   const handleCancelDelete = () => setClientToDelete(null);

    //   const handleDelete = async (clientId) => {
    //     try {
    //       await deleteClient({id: clientId}).unwrap();
    //       toast.success("Client deleted successfully");
    //       setClientToDelete(null);
    //       refetch();
    //     } catch (error) {
    //       toast.error("Failed to delete client");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Client List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Clients</li>
                            <li className="breadcrumb-item active">Client List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Clients</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Client Type</th>
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Phone Number</th>
                                                    <th scope="col">Cell Number</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Fax</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientData.map((client, index) => (
                                                    <tr key={client.clientId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{client.clientTypeName}</td>
                                                        <td>{client.clientName}</td>
                                                        <td>{client.clientAddress}</td>
                                                        <td>{client.clientPhoneNumber}</td>
                                                        <td>{client.clientCellNumber}</td>
                                                        <td>{client.clientEmail}</td>
                                                        <td>{client.clientFax}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-client/${client.clientId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(client.clientId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`client-${client.clientId}`}
                                                                    checked={client.isActive}
                                                                    onChange={(e) => handleToggleChange(client.clientId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`client-${client.clientId}`}
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
            </main>
            {/* {clientToDelete && (
            <ConfirmationModal
            show={clientToDelete !== null}
            onClose={handleCancelDelete}
            onConfirm={() => handleDelete(clientToDelete)}
            title="Delete Confirmation"
            message="Are you sure you want to delete this client?"
            />
            )} */}
        </>
    );
};

export default ClientList;