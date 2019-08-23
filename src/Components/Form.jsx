import React, { useState, useEffect} from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ( { errors, touched, values, status} ) => {
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() =>{
        if (status){
            setUsers([...users, status]);
        }
     }, [status]);
 return (
    <div className='user-form'>
        <Form>
            User Login
            <Field name='name' 
            type='text' 
            placeholder='Full Name'
            />
            {touched.name && errors.name && (<p>{errors.name}</p>)}

            <Field 
            name='email' 
            type='email' 
            placeholder='E-mail Address'
            required
            />
            {touched.email && errors.email && <p>{errors.email}</p>}

            <Field name='password' type='password' id='pass' minLength='5' placeholder='Password (5 characters min)'/>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <label className="check-box">
                Terms of Service:
                {touched.terms && errors.terms && <p>{errors.terms}</p>} 
               <Field type='checkbox' name='terms' checked={values.terms}/>
              
               <span className="checkmark"/>
            </label>
            <button className='submit-btn' type='submit'>Submit!</button>
        </Form>
        {users.map(user => (
                <ul key={user.id}>
                    <li>User Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: Nice try!</li>
                </ul>
            ))}
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
        name: Yup.string().required("Please Enter a name."),

        email: Yup.string().required("Email Required!"),
        email: Yup.string().required("Please enter an email."),

        password: Yup.string().required("password required!"),
        password: Yup.string().required("Please enter a password."),

        terms: Yup.string().required("Terms of service required."),
        terms: Yup.string().required("Please check the box."),
    }),
    handleSubmit(values, { setStatus, setSubmitting, resetForm }) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res.data);
            resetForm();
            setSubmitting(false);
            setStatus(res.data);
        }) 
        .catch(err => {
            console.log(err.response)
            // setSubmitting(false)
        })
    }
})(UserForm);

export default FormikUserForm;