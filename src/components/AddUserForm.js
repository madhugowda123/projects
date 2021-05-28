import React, { useState } from "react";

const AddUserForm = (props) => {
  const initialFormState = {
    id: null,
    education: "",
    institute: "",
    university: "",
    passingyear: "",
    percentage: "",
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !user.education ||
          !user.institute ||
          !user.university ||
          !user.passingyear ||
          !user.percentage
        )
          return;

        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <h2>Add User</h2>
      <div className="form-group">
        <label>Education</label>
        <input
          type="text"
          name="education"
          value={user.education}
          onChange={handleInputChange}
          pattern="[a-zA-Z]+"
          required
        />
      </div>
      <div className="form-group">
        <label>Institute</label>
        <input
          type="text"
          name="institute"
          value={user.institute}
          onChange={handleInputChange}
          pattern="[a-zA-Z]+"
          required
        />
      </div>
      <div className="form-group">
        <label>University</label>
        <input
          type="text"
          name="university"
          value={user.university}
          onChange={handleInputChange}
          pattern="[a-zA-Z0-9-]+"
          required
        />
      </div>
      <div className="form-group">
        <label>Passing year</label>
        <input
          type="text"
          name="passingyear"
          value={user.passingyear}
          onChange={handleInputChange}
          pattern="[0-9]{4}"
          required
        />
      </div>
      <div className="form-group">
        <label>Percentage</label>
        <input
          type="text"
          name="percentage"
          value={user.percentage}
          onChange={handleInputChange}
          pattern="[0-9]{2}"
          required
        />
      </div>
      <button className="modal-button">Add</button>
    </form>
  );
};

export default AddUserForm;
