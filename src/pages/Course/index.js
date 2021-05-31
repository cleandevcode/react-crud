import React, { useState, useEffect } from "react";
import { getCreatedCourse, getCourse } from "../../app/api";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import CreateCourse from "../../components/CreateCourse";
import MySwal from "../..";
import SimpleTable from "../../components/DataTable/simpleTable";
import "../../app.scss";

const Course = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeModal, setActiveModal] = useState(false);

  const setModal = () => {
    setActiveModal(true);
  };

  const createCourse = async (course) => {
    setActiveModal(false);
    setLoading(true);
    const id = props.match.params.id;

    try {
      await getCreatedCourse({
        studentId: id,
        name: course.name,
        description: course.description,
      }).then((res) => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Course created successfully.",
        }).then(() => {
          setData([...data, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Unknown Error Occured.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = (id) => {
    setLoading(true);
    getCourse(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const { id } = props.match.params;
    fetchCourse(id);
  }, []);

  return (
    <div className="app">
      <h1 style={{ paddingLeft: 20 }}>Course</h1>
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <button className="primary-btn" onClick={setModal}>
                  Create New Course
                </button>
              </div>
              <SimpleTable rows={data} />
            </div>
          )}
        </div>
      </main>
      {activeModal && (
        <Modal activeModal={activeModal}>
          <CreateCourse
            createCourse={createCourse}
            setActiveModal={setActiveModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Course;
