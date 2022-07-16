import { useState, useEffect } from "react";
import "./App.css";
function App() {
    const initialValues = { username: "", email: "", phone: "", age: "", dob: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    var ob1 = JSON.parse(localStorage.getItem('userDetails'));
    const handleChange = (e) => {
        const { name, value } = e.target;
        var age = ageCalculator();
        document.getElementById("age").value = age;
        formValues.age = age;
        setFormValues({ ...formValues, [name]: value });

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if (ob1 != null) {
            console.log(ob1.length);
            ob1[ob1.length] = formValues;
            localStorage.setItem('userDetails', JSON.stringify(ob1));
            console.log(formValues.username);
        }
        else {
            var arr = [];
            arr.push({ ...formValues });
            localStorage.setItem('userDetails', JSON.stringify(arr));
        }

        setIsSubmit(true);
    };
    function ageCalculator() {
        var userinput = document.getElementById("dob").value;
        var dob = new Date(userinput);
        if (userinput == null || userinput == '') {
            return false;
        } else {
            var month_diff = Date.now() - dob.getTime();
            var age_dt = new Date(month_diff);
            var year = age_dt.getUTCFullYear();
            var age = Math.abs(year - 1970);
            console.log(age);
            return age;
        }
    }
    useEffect(() => {
        console.log(localStorage.getItem('userDetails'));
        const ob = localStorage.getItem('userDetails');
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        } else if (values.username.length < 3) {
            errors.username = "username must be atleast 3 characters"
        } else if (values.username.length > 20) {
            errors.username = "username should not exceed 20 characters"
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {

        } else if (values.phone.length > 10) {
            errors.phone = "phone number must not more exceed 10 characters";
        } else if (values.phone.length < 10) {
            errors.phone = "phone number should be 10 characters";
        }
        console.log(values.age);
        if (values.age < 18) {
            errors.age = "You should be 18 years old"
        }
        return errors;
    };
    return (
        <div>
            <div className="container">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">Signed in successfully</div>
                ) : (
                    <h3></h3>
                )}
                <form onSubmit={handleSubmit}>
                    <h1>Login Form</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.username}</p>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.email}</p>
                        <div className="field">
                            <label>Mobile</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Mobile"
                                value={formValues.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.phone}</p>
                        <div className="field">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formValues.dob}
                                onChange={handleChange}
                                id="dob"
                            />
                        </div>
                        <div className="field">
                            <input
                                id="age"
                                type="hidden"
                                name="age"
                                value={formValues.age}
                                placeholder="Age"
                            />
                            <span>Your age : {formValues.age} </span>
                        </div>
                        <p>{formErrors.age}</p>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
                <table class="ui celled table">
                    <thead>
                        <tr><th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>MOBILE NUMBER</th>
                            <th>DOB</th>
                        </tr></thead>
                    <tbody>
                        {ob1 !== null ? (
                            ob1.map((val) => {

                                return (
                                    <tr>

                                        <td data-label="Name">{val.username}</td>
                                        <td data-label="Age">{val.email}</td>
                                        <td data-label="Job">{val.phone}</td>
                                        <td data-label="Job">{val.dob}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <h3></h3>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default App;