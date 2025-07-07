import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteProductMutation, useGetProductListQuery } from "../../services/apis/Product";

const ProductList = () => {
    const [toggleStates, setToggleStates] = useState({});
    const { data: productList, error: productListError, loading: productListLoading, refetch } = useGetProductListQuery();
    const [deleteProduct] = useDeleteProductMutation();
    // const [productToDelete, setProductToDelete] = useState(null);

    if (productListLoading) return <div>Loading...</div>;
    if (productListError) return <div>Error: {productListError.message || 'An error occurred'}</div>;

    const productData = productList?.data || [];

    if (productList == undefined) {
        return <div>No Products Available</div>;
    }

    if (Object.keys(toggleStates).length === 0 && productData.length > 0) {
        const initialState = productData.reduce((acc, product) => {
            acc[product.productId] = true;
            return acc;
        }, {});
        setToggleStates(initialState);
    }

    const handleToggleChange = async (productId, isChecked) => {
        try {
            await deleteProduct({ id: productId }).unwrap();
            refetch();
            toast.success("Product status updated successfully");
        } catch (error) {
            toast.error("Failed to update Product status");
        }
    };

    //   const handleDeleteConfirmation = (productId) => setProductToDelete(productId);
    //   const handleCancelDelete = () => setProductToDelete(null);

    //   const handleDelete = async (productId) => {
    //     try {
    //       await deleteProduct({id: productId}).unwrap();
    //       toast.success("Product deleted successfully");
    //       refetch();
    //       setProductToDelete(null);
    //     } catch (error) {
    //       toast.error("Failed to delete Product");
    //     }
    //   };

    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Products List</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item">Products</li>
                            <li className="breadcrumb-item active">Products List</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="card">
                                <div className="card-body ">
                                    <h5 className="card-title">Details of Products</h5>
                                    <div
                                        style={{ overflowX: "auto" }}
                                    >
                                        <table className="table table-bordered" >
                                            <thead>
                                                <tr>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Product Image</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Qty. In Hand</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productData?.map((product, index) => (
                                                    <tr key={product.productId}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {product.picture ? (
                                                            <img 
                                                            src={`${import.meta.env.VITE_BASE_URL_IMG}${product.picture}`} 
                                                            width="50" 
                                                            height="50" />
                                                            ) : null}
                                                        </td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.qtyInHand}</td>
                                                        <td className="d-flex">
                                                            <Link to={`/update-product/${product.productId}`}>
                                                                <button type="button" className="btn btn-success btn-sm me-2">Edit</button>
                                                            </Link>
                                                            {/* <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteConfirmation(product.productId)}
                                                    >
                                                        Delete
                                                    </button> */}
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={`product-${product.productId}`}
                                                                    checked={product.isActive}
                                                                    onChange={(e) => handleToggleChange(product.productId, e.target.checked)}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`product-${product.productId}`}
                                                                >
                                                                    {product.isActive ? "Active" : "InActive"}
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
            {/* {productToDelete && (
                <ConfirmationModal
                    show={productToDelete !== null}
                    onClose={handleCancelDelete}
                    onConfirm={() => handleDelete(productToDelete)}
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this product?"
                />
            )} */}
        </>
    );
};

export default ProductList;