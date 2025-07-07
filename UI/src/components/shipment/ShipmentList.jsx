import React, { useState } from "react";
import { useDeleteClientMutation, useGetClientListQuery } from "../../services/apis/Client";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteShipmentMutation, useGetShipmentListQuery } from "../../services/apis/Shipment";

const ShipmentList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: shipmentList, error: shipmentListError, loading: shipmentListLoading, refetch } = useGetShipmentListQuery();
    const [deleteShipment] = useDeleteShipmentMutation();
    // const [shipmentToDelete, setShipmentToDelete] = useState(null);

    if (shipmentListLoading) return <div>Loading...</div>;
    if (shipmentListError) return <div>Error: {shipmentListError.message || 'An error occurred'}</div>;

    const shipmentData = shipmentList?.data || [];

    if (shipmentData == undefined) {
        return <div>No Shipments Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && shipmentData.length > 0) {
        const initialState = shipmentData.reduce((acc, shipment) => {
            acc[shipment.shipmentId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (shipmentId, isChecked) => {
        try {
            await deleteShipment({ id: shipmentId }).unwrap();
            refetch();
            toast.success("Shipment status updated successfully");
        } catch (error) {
            toast.error("Failed to update Shipment status");
        }
    };

    //   const handleDeleteConfirmation = (shipmentId) => setShipmentToDelete(shipmentId);
    //   const handleCancelDelete = () => setShipmentToDelete(null);

    //   const handleDelete = async (shipmentId) => {
    //     try {
    //       await deleteShipment({id: shipmentId}).unwrap();
    //       toast.success("Shipment deleted successfully");
    //       refetch();
    //       setShipmentToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Shipment");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Shipment List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Shipments</li>
                            <li className="breadcrumb-item active">Shipment List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Shipments</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead 
                                                style={{verticalAlign: "middle"}}
                                            >
                                                <tr>
                                                    <th scope="col" className="">S.No</th>
                                                    <th scope="col">Client Type</th>
                                                    <th scope="col">Order Name</th>
                                                    <th scope="col">Shipment Date</th>
                                                    <th scope="col">Shipment From</th>
                                                    <th scope="col">Shipment To</th>
                                                    <th scope="col">Shipment Charges</th>
                                                    <th scope="col">Clearance Charges</th>
                                                    <th scope="col">Port Charges</th>
                                                    <th scope="col">Misc. Charges</th>
                                                    <th scope="col">Notes</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shipmentData.map((shipment, index) => (
                                                    <tr key={shipment.shipmentId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{shipment.clientTypeName}</td>
                                                        <td>{shipment.orderName}</td>
                                                        <td>{new Date(shipment.shipmentDate).toLocaleDateString('en-CA')}</td>
                                                        <td>{shipment.shipmentFrom}</td>
                                                        <td>{shipment.shipmentTo}</td>
                                                        <td>{shipment.shipmentCharges}</td>
                                                        <td>{shipment.clearanceCharges}</td>
                                                        <td>{shipment.portCharges}</td>
                                                        <td>{shipment.miscCharges}</td>
                                                        <td>{shipment.notes}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-shipment/${shipment.shipmentId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(shipment.shipmentId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`shipment-${shipment.shipmentId}`}
                                                                    checked={shipment.isActive}
                                                                    onChange={(e) => handleToggleChange(shipment.shipmentId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`shipment-${shipment.shipmentId}`}
                                                                >
                                                                    {shipment.isActive ? "Active" : "InActive"}
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
            {/* {shipmentToDelete && (
                <ConfirmationModal
                    show={shipmentToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(shipmentToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this shipment?"
                />
            )} */}
        </>
    );
};

export default ShipmentList;