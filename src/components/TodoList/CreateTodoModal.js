import { Form, FormLayout, Modal, TextContainer, TextField } from "@shopify/polaris"
import { useState } from "react";
import useCreate from "../../hooks/useCreateApi";

export const CreateTodoModal = ({ active, toggleModal, onSuccess }) => {
    const { createData: createTodo, loading: createLoading } = useCreate('/todos');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        title: ''
    });

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async () => {
        try {
            const { title } = formData;
            if (!title || title.trim().length === 0) {
                setErrorMessage('Title is required');
                return;
            } else {
                setErrorMessage('');
            }
            const response = await createTodo(formData);
            await onSuccess(prev => [...prev, response?.data]);
            toggleModal();
        } catch (e) {
            console.log(e);
        } finally {
            setFormData({
                title: '',
                completed: false
            });
        }
    }

    const handleCancel = () => {
        setFormData({
            title: '',
            completed: false
        });
        toggleModal();
    }

    return (
        <Modal
            size='small'
            open={active}
            onClose={handleCancel}
            title='Create todo'
            primaryAction={{
                content: 'Add',
                onAction: handleSubmit,
                loading: createLoading
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleCancel,
                    disabled: createLoading
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormLayout>
                            <TextField
                                value={formData.title}
                                onChange={handleChange("title")}
                                label="Title"
                                type="text"
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </FormLayout>
                    </Form>
                </TextContainer>
            </Modal.Section>
        </Modal>
    )
}