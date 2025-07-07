import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ClientTypeApi, { useAddClientTypeMutation } from '../../services/apis/ClientType';
import { toast } from 'react-toastify';
import AddModal from './addModal';
import { useDispatch } from 'react-redux';

function AddClientType() {
    const [addClientType] = useAddClientTypeMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            const payload = {
                clientTypeName: formData.clientTypeName,
            };
            await addClientType({...payload}).unwrap();
            toast.success("Client Type added successfully");
            navigate('/client-type-list');
        } catch (error) {
            toast.error("Failed to add Client Type");
        }
    };

    return (
        <>
            <AddModal
            show={true}
            onClose={() => navigate(-1)} 
            onConfirm={handleSubmit(onSubmit)}
            title="Add Client Type"
            message={
                <div>
                    <input
                        type="text"
                        placeholder="Enter Client Type Name"
                        {...register("clientTypeName", { required: true })}
                        className="form-control"
                    />
                </div>
            }
        />
        </>
    );
}

export default AddClientType;