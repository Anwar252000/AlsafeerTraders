import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductApi, { useGetProductByIdQuery, useUpdateProductMutation } from '../../services/apis/Product';
import { useDispatch } from 'react-redux';

function EditProduct() {
    const { id: productId } = useParams();
    const { data: productData } = useGetProductByIdQuery(productId);
    const [ updateProduct ] = useUpdateProductMutation();
    const navigate = useNavigate();

    const products = productData?.data || [];

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (products) {
          setValue("productName", products?.productName);
          setValue("productId", products?.productId);
          setValue("qtyInHand", products?.qtyInHand);
          setValue("isActive", products?.isActive);
          setValue("pictureFile", products?.pictureFile);

          if (products?.picture) {
            setImagePreview(`${import.meta.env.VITE_BASE_URL_IMG}${products?.picture}`);
            }
         }
      }, [products, setValue]);

    const onSubmit = async (formData) => {
        try {
            const payload = new FormData();
            payload.append('productName', formData.productName);
            payload.append('qtyInHand', formData.qtyInHand); 
            payload.append('productId', formData.productId); 

            if (formData.pictureFile && formData.pictureFile.length > 0) {
                payload.append('pictureFile', formData.pictureFile[0]);
            }  else if (products?.picture) {
                payload.append('picture', products?.picture);
            }

            await updateProduct({body:payload}).unwrap();
            toast.success("Product updated successfully");
            navigate('/product-list')

        } catch (error) {
            toast.error("Failed to update product");
        }
    };

    return (
        <>
            <main id="main" className="main ">
                <div className="pagetitle">
                    <h1>Update Product</h1>
                </div>

                <section className="section profile ">
                    <div className="row">
                        <div className="col-xl-10">
                            <div className="card">
                                <div className="card-body pt-1">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#std-details">Update Product's Details</button>
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
                                                    <img src={imagePreview} alt="Current Product" width="100" height="100" />
                                                      )}
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        {...register('pictureFile')}
                                                    />
                                                </div>
                                                {/* {errors.picture && (<div className="invalid-feedback">{errors.picture.message}</div>)} */}

                                                <div className="col-md-4 mb-2">
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

                                                <div className="col-md-4 mb-2">
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

export default EditProduct;