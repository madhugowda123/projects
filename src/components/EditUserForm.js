import React, { useState, useEffect } from "react";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateUser(user.id, user);
      }}
    >
      <div className="form-group">
        <h2>Edit User</h2>
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
        <label>Passing Year</label>
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
      <button className="modal-button">Update user</button>
    </form>
  );
};

export default EditUserForm;
