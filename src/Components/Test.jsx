import React, { useState, useEffect} from 'react';
import axios from "axios";
import { Form, Field, withFormik} from "formik";
import * as Yup from "yup";

const UserForm = ({errors, touched, values, status}) =>{
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() =>{
        if (status){
            setUsers([...users, status]);
        }
     }, [status])
    return(
        <div className="form-parent">
            <Form>
                <label>
                Name
                <Field 
                name="user" 
                type="text" 
                placeholder="User Name"
                />
                {touched.user && errors.user && (
                    <p>{errors.user}</p>
                )}
                </label>
                <label>
                    Email
                    <Field 
                    name="email" 
                    type="email" placeholder="email@email.com" 
                    required/>
                </label>  
                <label>
                    Password
                    <Field name="password" type="password" placeholder="password"/>
                    {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                </label>
                
                <label className="checkmark-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark"/>
                </label>
                <button>Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>User Name: {user.user}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
}
const FormikUserForm = withFormik({
    mapPropsToValues({ user, email, password, terms}){
        return{
            user: user || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validateSchema: Yup.object().shape({
        user: Yup.string().required("required"),
        password: Yup.string().required("required")
    }),

    handleSubmit(values, { setStatus }) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            console.log(values);
          })
          .catch(err => console.log(err.response));
      }
})(UserForm);

export default FormikUserForm;