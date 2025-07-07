import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetUserListQuery } from "../../services/apis/User";

const UserList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: userList, error: userListError, loading: userListLoading, refetch } = useGetUserListQuery();
    const [deleteUser] = useDeleteUserMutation();
    // const [userToDelete, setUserToDelete] = useState(null);

    if (userListLoading) return <div>Loading...</div>;
    if (userListError) return <div>Error: {userListError.message || 'An error occurred'}</div>;

    const userData = userList?.data || [];

    if (userData == undefined) {
        return <div>No Users Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && userData.length > 0) {
        const initialState = userData.reduce((acc, user) => {
            acc[user.userId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (userId, isChecked) => {
        try {
            await deleteUser({ id: userId }).unwrap();
            refetch();
            toast.success("User status updated successfully");
        } catch (error) {
            toast.error("Failed to update User status");
        }
    };

    //   const handleDeleteConfirmation = (userId) => setUserToDelete(userId);
    //   const handleCancelDelete = () => setUserToDelete(null);

    //   const handleDelete = async (userId) => {
    //     try {
    //       await deleteUser({id: userId}).unwrap();
    //       toast.success("User deleted successfully");
    //       refetch();
    //       setUserToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete User");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>User List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Users</li>
                            <li className="breadcrumb-item active">User List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Users</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Full Name</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">RoleName</th>
                                                    <th scope="col">Password</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userData.map((user, index) => (
                                                    <tr key={user.userId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{user.name}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.roleName}</td>
                                                        <td className="">{'*'.repeat(user.password.length).slice(0, 10)}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-user/${user.userId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(user.userId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`user-${user.userId}`}
                                                                    checked={user.isActive}
                                                                    onChange={(e) => handleToggleChange(user.userId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`user-${user.userId}`}
                                                                >
                                                                    {user.isActive ? "Active" : "InActive"}
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
            {/* {userToDelete && (
                <ConfirmationModal
                    show={userToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(userToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this User?"
                />
            )} */}
        </>
    );
};

export default UserList;