/*
Create a form with the following 
- Name
- Email
- Password
- Terms of Service (checkbox)
- A Submit button to send our form data to the server.
*/

import React from 'react';
import { Form, Field, Formik, withFormik } from 'formik';

const UserForm = ( { values } ) => {
 return (
    <div className='user-form'>
        <Formik>
        <Form>
            User Login
            <Field name='name' type='text' placeholder='Full Name'/>
            <Field name='email' type='email' placeholder='E-mail Address'/>
            <Field name='password' type='password' id='pass' minlength='5' required placeholder='(5 characters minimum):'/>
        </Form>
        </Formik>
    </div>

 ) //end return 

} // END Form

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
        }
    }
})

export default UserForm;