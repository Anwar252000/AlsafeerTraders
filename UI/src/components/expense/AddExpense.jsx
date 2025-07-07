import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpenseApi, { useAddExpenseMutation } from '../../services/apis/Expense';
import { useGetClientTypeListQuery } from '../../services/apis/ClientType';
import { useDispatch } from 'react-redux';

function AddExpense() {
    const [addExpense] = useAddExpenseMutation();
    const { data: clientTypeList } = useGetClientTypeListQuery();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = new FormData();
            payload.append('expenseType', formData.expenseType);
            payload.append('pictureFile', formData.pictureFile[0]);
            payload.append('amount', formData.amount); 
            payload.append('status', formData.status); 
            payload.append('clientTypeId', formData.clientTypeId); 
    
            await addExpense(payload).unwrap();
            toast.success("Expense added successfully");
            navigate('/expense-list');

        } catch (error) {
            toast.error("Failed to add Expense");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Expenses</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Expenses' Details</button>
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
                                                        Client Type
                                                    </label>
                                                    <select
                                                      className="form-control"
                                                      {...register("clientTypeId", { required: true })}
                                                    >
                                                        {clientTypeList?.data.map((option, index) => (
                                                          <option key={index} value={option.clientTypeId}>{option.clientTypeName}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Picture
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id=""
                                                        {...register('pictureFile')} />
                                                </div>
                                                {/* {errors.picture && (<div className="invalid-feedback">{errors.picture.message}</div>)} */}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Expense Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        {...register('expenseType', { required: 'Expense Type is required' })} />
                                                </div>
                                                {errors.ExpenseType && (<div className="invalid-feedback">{errors.ExpenseType.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        {...register('amount', { required: 'Amount is required' })} />
                                                </div>
                                                {errors.amount && (<div className="invalid-feedback">{errors.amount.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Status
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        {...register('status', { required: 'Status is required' })} />
                                                </div>
                                                {errors.status && (<div className="invalid-feedback">{errors.status.message}</div>)}

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

export default AddExpense;