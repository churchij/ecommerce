import { React, useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';

export function Users(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/v1/Users", {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                getUsers(); //refresh users
            });
    }

    async function getUsers() {
        const response = await fetch('/api/v1/Users');
        const data = await response.json();
        setUsers(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="emailAddress" className="col-4 col-form-label">Email address</label>
                    <div className="col-8">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-address-book"></i>
                                </div>
                            </div>
                            <input id="emailAddress" value={inputs.emailAddress || ""} onChange={handleChange} name="emailAddress" required="required" placeholder="Enter email address" type="text" aria-describedby="emailAddressHelpBlock" className="form-control" />
                        </div>
                        <span id="emailAddressHelpBlock" className="form-text text-muted">Enter your email address</span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-4 col-form-label">First name</label>
                    <div className="col-8">
                        <input id="firstName" value={inputs.firstName || ""} onChange={handleChange} name="firstName" placeholder="Enter first name" type="text" aria-describedby="firstNameHelpBlock" required="required" className="form-control" />
                        <span id="firstNameHelpBlock" className="form-text text-muted">Enter your first name</span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-4 col-form-label">Last name</label>
                    <div className="col-8">
                        <input id="lastName" value={inputs.lastName || ""} onChange={handleChange} name="lastName" placeholder="Enter last name" type="text" className="form-control" aria-describedby="lastNameHelpBlock" required="required" />
                        <span id="lastNameHelpBlock" className="form-text text-muted">Enter your last name</span>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-4 col-form-label">Password</label>
                    <div className="col-8">
                        <input id="password" value={inputs.password || ""} onChange={handleChange} name="password" placeholder="Enter password" type="password" className="form-control" aria-describedby="passwordHelpBlock" required="required" />
                        <span id="passwordHelpBlock" className="form-text text-muted">Enter your password</span>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-4 col-8">
                        <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
            {
                users.length === 0 ? <div>No users</div> : <div>

                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>userId</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Password</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.password}</td>
                                    <td><button className="btn btn-primary">Edit</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

