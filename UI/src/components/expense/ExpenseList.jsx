import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteExpenseMutation, useGetExpenseListQuery } from "../../services/apis/Expense";

const ExpenseList = () => {
    const [toggleStates, setToggleStates] = useState({});
    // const [ExpenseToDelete, setExpenseToDelete] = useState(null);
    const { data: ExpenseList, error: ExpenseListError, loading: ExpenseListLoading, refetch } = useGetExpenseListQuery();
    const [deleteExpense] = useDeleteExpenseMutation();

    const ExpenseData = ExpenseList?.data || [];

    if (ExpenseListLoading) return <div>Loading...</div>;
    if (ExpenseListError) return <div>Error: {ExpenseListError.message || 'An error occurred'}</div>;

    if (ExpenseList == undefined) {
        return <div>No Expenses Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && ExpenseData.length > 0) {
        const initialState = ExpenseData.reduce((acc, expense) => {
            acc[expense.expenseId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (expenseId, isChecked) => {
        try {
            await deleteExpense({ id: expenseId }).unwrap();
            refetch();
            toast.success("Expense status updated successfully");
        } catch (error) {
            toast.error("Failed to update Expense status");
        }
    };

    //   const handleDelete = async (ExpenseId) => {
    //     try {
    //       await deleteExpense({id: ExpenseId}).unwrap();
    //       toast.success("Expense deleted successfully");
    //       refetch();
    //       setExpenseToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Expense");
    //     }
    //   };

    // const handleCancelDelete = () => setExpenseToDelete(null);

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Expenses List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Expenses</li>
                            <li className="breadcrumb-item active">Expenses List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Expenses</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Picture</th>
                                                    <th scope="col">Expense Type</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Client Type</th>
                                                    <th scope="col">Exp. Status</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ExpenseData?.map((Expense, index) => (
                                                    <tr key={Expense.expenseId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{Expense.picture ? (
                                                            <img
                                                                src={`${import.meta.env.VITE_BASE_URL_IMG}${Expense.picture}`}
                                                                width="50"
                                                                height="50"
                                                            />
                                                            ) : null}
                                                        </td>
                                                        <td>{Expense.expenseType}</td>
                                                        <td>{Expense.amount}</td>
                                                        <td>{Expense.clientTypeName}</td>
                                                        <td>{Expense.status}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-expense/${Expense.expenseId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteConfirmation(Expense.expenseId)}
                                                        >
                                                            Delete
                                                        </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`Expense-${Expense.expenseId}`}
                                                                    checked={Expense.isActive}
                                                                    onChange={(e) => handleToggleChange(Expense.expenseId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`Expense-${Expense.expenseId}`}
                                                                >
                                                                    {Expense.isActive ? "Active" : "InActive"}
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
            {/* {ExpenseToDelete && (
                <ConfirmationModal
                    show={ExpenseToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleConfirmDelete(ExpenseToDelete)}
                    title="Deactivate Confirmation"
                    message="Are you sure you want to deactivate this Expense?"
                />
            )} */}
        </>
    );
};

export default ExpenseList;