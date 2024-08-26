import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addCustomer } from '../api/customerapi';
import { Customer } from '../interfaces/Customer';

const AddCustomer: React.FC = () => {
  const initialValues = {
    FirstName: '',
    LastName: '',
    Address: '',
    PhoneNumber: '',
    EmailAddress: '',
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'First Name must be a string')
      .required('First Name is required'),
    LastName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Last Name must be a string')
      .required('Last Name is required'),
    Address: Yup.string().required('Address is required'),
    PhoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone Number must be a valid 10-digit number')
      .required('Phone Number is required'),
    EmailAddress: Yup.string()
      .email('Invalid email address')
      .required('Email Address is required'),
  });

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      const newCustomer: Omit<Customer, 'CustomerId'> = {
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        PhoneNumber: values.PhoneNumber,
        EmailAddress: values.EmailAddress,
      };

      await addCustomer(newCustomer);
      resetForm(); 
     
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
    
  };

  return (
    <div className="container mt-4" style={{ width: '30%' }}>
      <h4>Add Customer</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="FirstName">First Name</label>
              <Field
                type="text"
                id="FirstName"
                name="FirstName"
                className="form-control border-secondary"
              />
              <ErrorMessage
                name="FirstName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="LastName">Last Name</label>
              <Field
                type="text"
                id="LastName"
                name="LastName"
                className="form-control border-secondary"
              />
              <ErrorMessage
                name="LastName"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <Field
                type="text"
                id="Address"
                name="Address"
                className="form-control border-secondary"
              />
              <ErrorMessage
                name="Address"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="PhoneNumber">Phone Number</label>
              <Field
                type="text"
                id="PhoneNumber"
                name="PhoneNumber"
                className="form-control border-secondary"
              />
              <ErrorMessage
                name="PhoneNumber"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="EmailAddress">Email Address</label>
              <Field
                type="email"
                id="EmailAddress"
                name="EmailAddress"
                className="form-control border-secondary"
              />
              <ErrorMessage
                name="EmailAddress"
                component="div"
                className="text-danger"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Add Customer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddCustomer;


