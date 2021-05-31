import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  // getDeletedUser,
} from "../../app/api";

// Styles
import "../../app.scss";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import CreateUser from "../../components/CreateUser";
import UpdateUser from "../../components/UpdateUser";
// import DeleteUser from "./components/DeleteUser";

import Modal from "../../components/Modal";
// import Search from "./components/Search";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import MySwal from "../../index";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = (modal) => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = (page) => {
    setCurrentPage(page);
  };

  // Search
  const search = (term) => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter((user) =>
        Object.keys(user).some((key) =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  // Sorting
  const sorting = (key) => {
    setSorted(!sorted);
    switch (key) {
      case "firstName":
        const nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.firstName.localeCompare(b.firstName, "tr")
            : b.firstName.localeCompare(a.firstName, "tr");
        });
        dispatch({ type: "SET_USERS", data: nameSort });
        return;
      case "lastName":
        const surnameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.lastName.localeCompare(b.lastName, "tr")
            : b.lastName.localeCompare(a.lastName, "tr");
        });
        dispatch({ type: "SET_USERS", data: surnameSort });
        return;
      case "email":
        const emailSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.email.localeCompare(b.email, "tr")
            : b.email.localeCompare(a.email, "tr");
        });
        dispatch({ type: "SET_USERS", data: emailSort });
        return;
      case "mobileNumber":
        const mobileNumberSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.mobileNumber.localeCompare(b.mobileNumber, "tr")
            : b.mobileNumber.localeCompare(a.mobileNumber, "tr");
        });
        dispatch({ type: "SET_USERS", data: mobileNumberSort });
        return;
      default:
        break;
    }
  };

  // Create User
  const createUser = async (user) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedUser(user).then((res) => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User created successfully.",
        })
          .then(() => {
            console.log("creating user----->", result);
            dispatch({ type: "CREATE_USER", data: result });
            setSavedUsers([...users, result]);
          })
          .catch((err) => {
            MySwal.fire({
              icon: "error",
              title: err.message,
            });
          });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create user.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = (user) => {
    setModal("Update User");

    setCurrentUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      mobileNumber: user.mobileNumber,
    });
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(id, updatedUser).then((res) => {
        const result = res.data;

        MySwal.fire({
          icon: "success",
          title: "User updated successfully.",
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map((user) =>
              user.id === id ? Object.assign(user, result) : user
            ),
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteRow = (user) => {
    setModal("Delete User");

    setCurrentUser({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      mobileNumber: user.mobileNumber,
    });
  };

  // const deleteUser = async (id) => {
  //   setActiveModal(false);
  //   setLoading(true);

  //   try {
  //     await getDeletedUser(id).then(() => {
  //       MySwal.fire({
  //         icon: "success",
  //         title: "User deleted successfully.",
  //       }).then(() => {
  //         dispatch({
  //           type: "SET_USERS",
  //           data: users.filter((user) => user.id !== id),
  //         });
  //         setSavedUsers(savedUsers.filter((user) => user.id !== id));
  //         setCurrentPage(1);
  //       });
  //     });
  //   } catch (err) {
  //     MySwal.fire({
  //       icon: "error",
  //       title: "Failed to delete user.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getUsers().then(({ data }) => {
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users.",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create User")}
                >
                  Create New User
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create User" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update User" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {/* {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )} */}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Home;
