import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ExpenseApi, { useGetExpenseByIdQuery, useUpdateExpenseMutation } from '../../services/apis/Expense';
import { useDispatch } from 'react-redux';

function EditExpense() {
    const { id: expenseId } = useParams();
    const { data: expenseData } = useGetExpenseByIdQuery(expenseId);
    const [ updateExpense ] = useUpdateExpenseMutation();
    const navigate = useNavigate();

    const expenses = expenseData?.data || [];

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (expenses) {
          setValue("expenseType", expenses?.expenseType);
          setValue("expenseId", expenses?.expenseId);
          setValue("clientTypeId", expenses?.clientTypeId)
          setValue("clientTypeName", expenses?.clientTypeName)
          setValue("amount", expenses?.amount);
          setValue("status", expenses?.status);
          setValue("isActive", expenses?.isActive);
          setValue("pictureFile", expenses?.pictureFile);

          if (expenses?.picture) {
            setImagePreview(`${import.meta.env.VITE_BASE_URL_IMG}${expenses?.picture}`);
            }
         }
      }, [expenses, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = new FormData();
            payload.append('expenseType', formData.expenseType);
            payload.append('expenseId', formData.expenseId);
            payload.append('amount', formData.amount);
            payload.append('status', formData.status);
            payload.append('clientTypeId', formData.clientTypeId);

            if (formData.pictureFile && formData.pictureFile.length > 0) {
                payload.append('pictureFile', formData.pictureFile[0]);
            } else if (expenses?.picture) {
                payload.append('picture', expenses?.picture);
            }

            await updateExpense({body:payload}).unwrap();
            toast.success("Expense updated successfully");
            navigate('/expense-list')

        } catch (error) {
            toast.error("Failed to update Expense");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Expense</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Expense's Details</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content pt-1">
                                        <div
                                            className="tab-pane fade show active"
                                            id="std-details"
                                        >
                                            <form className="row g-3 mt-1" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="col-md-4 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        
                                                    </label>
                                                    {imagePreview && (
                                                    <img src={imagePreview} alt="Current Expense" width="100" height="100" />
                                                      )}
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        {...register('pictureFile')}
                                                    />
                                                </div>
                                                {/* {errors.picture && (<div className="invalid-feedback">{errors.picture.message}</div>)} */}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Client Type
                                                    </label>
                                                    {/* <select
                                                      className="form-control"
                                                      {...register("clientTypeId", { required: true })}
                                                    >
                                                        {expenseData?.data.map((option, index) => (
                                                          <option key={index} value={option.clientTypeId}>{option.clientTypeName}</option>
                                                        ))}
                                                    </select> */}
                                                     <input
                                                            type="text"
                                                            className="form-control"
                                                            value={expenses?.clientTypeName || ''}
                                                            readOnly
                                                        />
                                                </div>

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

export default EditExpense;