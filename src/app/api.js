import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getUsers() {
  const response = axios.get(`${apiURL}/students`);

  return response;
}

function getCreatedUser({
  firstName,
  lastName,
  email,
  password,
  mobileNumber,
}) {
  const response = axios.post(`${apiURL}/students`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
  });

  return response;
}

function getUpdatedUser(id, user) {
  const response = axios.put(`${apiURL}/students/${id}`, {
    id: id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNumber: user.mobileNumber,
    password: user.password,
  });

  return response;
}

function getDeletedUser(id) {
  const response = axios.delete(`${apiURL}/students/${id}`);

  return response;
}

export { getUsers, getCreatedUser, getUpdatedUser, getDeletedUser };
