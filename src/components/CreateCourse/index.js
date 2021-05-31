import React, { useState } from "react";

const CreateCourse = (props) => {
  const initialData = {
    name: "",
    description: "",
  };
  const [data, setData] = useState(initialData);

  const cancel = (event) => {
    event.preventDefault();
    props.setActiveModal(false);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!data.name || !data.description) return;
        props.createCourse(data);
      }}
    >
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          type="text"
          style={{
            width: "100%",
            padding: 10,
            height: 100,
            border: "1px solid #ccc",
          }}
          name="description"
          value={data.description}
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

export default CreateCourse;
