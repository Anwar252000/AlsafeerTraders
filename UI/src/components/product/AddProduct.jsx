import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductApi, { useAddProductMutation } from '../../services/apis/Product';
import { useDispatch } from 'react-redux';

function AddProduct() {
    const [addProduct] = useAddProductMutation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (formData) => {
        try {
            const payload = new FormData();
            payload.append('productName', formData.productName);
            payload.append('pictureFile', formData.pictureFile[0]);
            payload.append('qtyInHand', formData.qtyInHand);            
    
            await addProduct(payload).unwrap();
            toast.success("Product added successfully");
            navigate('/product-list');

        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Add Products</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Fill In Products' Details</button>
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
                                                        Product Image
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
                                                        Product Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id=""
                                                        {...register('productName', { required: 'Product Name is required' })} />
                                                </div>
                                                {errors.productName && (<div className="invalid-feedback">{errors.productName.message}</div>)}

                                                <div className="col-md-6 mb-2">
                                                    <label
                                                        htmlFor="validationDefault01"
                                                        className="form-label fw-bold"
                                                    >
                                                        Qty. In Hand
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id=""
                                                        {...register('qtyInHand', { required: 'Quantity is required' })} />
                                                </div>
                                                {errors.qtyInHand && (<div className="invalid-feedback">{errors.qtyInHand.message}</div>)}

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

export default AddProduct;