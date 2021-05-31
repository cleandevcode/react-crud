import React, { useState } from "react";

const CreateUser = (props) => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  };
  const [user, setUser] = useState(initialData);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const cancel = (event) => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.firstName || !user.lastName) return;
        props.createUser(user);
      }}
    >
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>E-Mail</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="number"
          name="mobileNumber"
          value={user.mobileNumber}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
