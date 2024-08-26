import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addPizza } from '../api/pizzaApi';
import { Pizza } from '../interfaces/Pizza';


const AddPizzaForm: React.FC = () => {
    const initialValues = {
        name: '',
        description: '',
        imageUrl: '',
        regularSizePrice: 0,
        mediumSizePrice: 0,
        largeSizePrice: 0,
        pizzaType: 'Veg',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Pizza name must be a string without numbers or special symbols')
        .required('Pizza Name is required'),
        description: Yup.string().required('Description is required'),
        imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
        regularSizePrice: Yup.number().min(1, 'Regular Size Price must be greater than zero').required('Regular Size Price is required'),
        mediumSizePrice: Yup.number().min(1, 'Medium Size Price must be greater than zero').required('Medium Size Price is required'),
        largeSizePrice: Yup.number().min(1, 'Large Size Price must be greater than zero').required('Large Size Price is required'),
        pizzaType: Yup.string().required('Pizza Type is required'),
    });

    const handleSubmit = async (values: typeof initialValues, { setSubmitting, resetForm, setStatus }: any) => {
        try {
            const newPizza: Omit<Pizza, 'PizzaId'> = {
                Name: values.name,
                Description: values.description,
                ImageUrl: values.imageUrl,
                RegularSizePrice: values.regularSizePrice,
                MediumSizePrice: values.mediumSizePrice,
                LargeSizePrice: values.largeSizePrice,
                Type: values.pizzaType,
            };

            await addPizza(newPizza);
            setStatus({ success: true });
            resetForm();
            
        } catch (error) {
            console.error('Error adding pizza:', error);
            setStatus({ success: false });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4" style={{ width: "30%" }}>
            <h4>Add New Pizza</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        {status && status.success && <div className="alert alert-info">Pizza added successfully!</div>}
                        {status && !status.success && <div className="alert alert-danger">Failed to add pizza.</div>}

                        <div className="form-group">
                            <label htmlFor="name">Pizza Name</label>
                            <Field
                                type="text"
                                className="form-control border-secondary"
                                id="name"
                                name="name"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field
                                as="textarea"
                                className="form-control border-secondary"
                                id="description"
                                name="description"
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <Field
                                type="text"
                                className="form-control border-secondary"
                                id="imageUrl"
                                name="imageUrl"
                            />
                            <ErrorMessage name="imageUrl" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="regularSizePrice">Regular Size Price</label>
                            <Field
                                type="number"
                                className="form-control border-secondary"
                                id="regularSizePrice"
                                name="regularSizePrice"
                            />
                            <ErrorMessage name="regularSizePrice" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mediumSizePrice">Medium Size Price</label>
                            <Field
                                type="number"
                                className="form-control border-secondary"
                                id="mediumSizePrice"
                                name="mediumSizePrice"
                            />
                            <ErrorMessage name="mediumSizePrice" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="largeSizePrice">Large Size Price</label>
                            <Field
                                type="number"
                                className="form-control border-secondary"
                                id="largeSizePrice"
                                name="largeSizePrice"
                            />
                            <ErrorMessage name="largeSizePrice" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pizzaType">Pizza Type</label>
                            <Field
                                as="select"
                                className="form-control border-secondary"
                                id="pizzaType"
                                name="pizzaType"
                            >
                                <option value="Veg">Veg</option>
                                <option value="NonVeg">NonVeg</option>
                            </Field>
                            <ErrorMessage name="pizzaType" component="div" className="text-danger" />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Pizza'}
                        </button>
                        <br /><br />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPizzaForm;
