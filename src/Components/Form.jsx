import React from 'react';
import { Form, Field, Formik, withFormik } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ( { errors, touched, values, status} ) => {
 return (
    <div className='user-form'>
        <Formik>
        <Form>
            User Login
            <Field name='name' type='text' placeholder='Full Name'/>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field name='email' type='email' placeholder='E-mail Address'/>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field name='password' type='password' id='pass' minLength='5' placeholder='Password (5 characters min)'/>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <label className="check-box">
                Terms of Service:
               <Field type='checkbox' name='terms'/>
               {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>} 
               <span className="checkmark"/>
            </label>
            <button className='submit-btn' type='submit'>Submit!</button>
        </Form>
        </Formik>
    </div>
 ) //end return 
} // END Form

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        email: Yup.string().required("Email Required."),
        password: Yup.string().required("password required."),
        terms: Yup.string().required("Terms of service required.")
    }),
    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res.data);
            setStatus(res.data)}) 
        .catch(err => {
            console.log(err.response)
        })
    }
})(UserForm);

export default FormikUserForm;