import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserListQuery } from "../../services/apis/User";

const UserPermissions = () => {
    const { data: userList, error: userListError, loading: userListLoading, refetch } = useGetUserListQuery();
  
    if (userListLoading ) return <div>Loading...</div>;
    if (userListError) return <div>Error: {userListError.message || 'An error occurred'}</div>;

    const userData = userList?.data || [];

    if (userData == undefined) {
        return <div>No Users Available</div>;
    }

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
                                    style={{overflowX: "auto"}}
                                    >
                                    <table className="table table-bordered" >
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Full Name</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">RoleName</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {userData.map((user, index) => (
                                            <tr key={user.userId}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>
                                                <td>{user.roleName}</td>
                                                <td className="d-flex">
                                                    <Link to={`/permissions/${user.userId}`}>
                                                    <button type="button" className="btn btn-primary btn-sm me-2 rounded">Permissions</button>
                                                    </Link>
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
        </>
    );
};

export default UserPermissions;