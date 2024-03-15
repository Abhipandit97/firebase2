import React from "react";
import { useEffect } from "react";
import "./App.css";
import {
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { firestore } from "./firebase";
import { useState } from "react";

const App = () => {
  let [st, updatest] = useState({
    id: "",
    rollno: "",
    name: "",
    branch: "",
    semester: "",
    year: "",
  });
  let [data, updatedata] = useState([]);
  useEffect(() => {
    const q = query(collection(firestore, "st"), orderBy("rollno", "desc"));
    onSnapshot(q, (querySnapshot) => {
      let d = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      updatedata(d);
    });
  }, [data]);
  function change(e) {
    updatest({ ...st, [e.target.name]: e.target.value });
  }
  //   addDoc(collection(firestore, "employ"), { employ: 123, Name: "Abhishek" });
  // });
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          width: "auto",
          height: "500px",
          backgroundColor: "grey",
          marginLeft: "400px auto",
        }}
      >
        <h1 style={{ color: "white" }} align="center" border="1px">
          Student Management System
        </h1>
        <div>
          <div className="table">
            <table
              align="center"
              border="1px"
              style={{ backgroundColor: "skyblue" }}
            >
              <tr>
                <th>Id</th>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Year</th>
                <th style={{ textAlign: "center" }}>Operation1</th>
                <th style={{ textAlign: "center" }}>Operation2</th>
              </tr>
              {data.map((v, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{v.id}</td>
                      <td>{v.rollno}</td>
                      <td>{v.name}</td>
                      <td>{v.branch}</td>
                      <td>{v.semester}</td>
                      <td>{v.year}</td>
                      <td style={{ alignContent: "center" }}>
                        <button
                          onClick={() => {
                            deleteDoc(doc(firestore, "st", v.id));
                            alert("Student sucessfully deleted");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <button
                        onClick={() => {
                          updatest(v);
                          // alert("employ sucessfully added");
                        }}
                      >
                        Update
                      </button>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>

          <div></div>
          <div
            className="Add"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "25px",
              border: "1px solid black",
              width: "30% ",
              marginLeft: "35% ",
              backgroundColor: "lightgrey",
              height: "200px",
              marginTop: "10px",
            }}
            border="1px"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (st.id === "") {
                  addDoc(collection(firestore, "st"), st);
                  alert("added sucessfully");
                } else {
                  updateDoc(doc(firestore, "st", st.id), st);
                  alert("Updated sucessfully");
                }
              }}
            >
              <input
                placeholder="Enter RollNo."
                type="number"
                name="rollno"
                value={st.rollno}
                onChange={change}
                style={{ marginTop: "5px" }}
              />
              <br />
              <input
                placeholder="Enter Name"
                type="text"
                name="name"
                value={st.name}
                onChange={change}
                style={{ marginTop: "5px" }}
              />
              <br />
              <input
                placeholder="Enter Branch"
                type="text"
                name="branch"
                value={st.branch}
                onChange={change}
                style={{ marginTop: "5px" }}
              />
              <br />
              <input
                placeholder="Enter Semester"
                type="text"
                name="semester"
                value={st.semester}
                onChange={change}
                style={{ marginTop: "5px" }}
              />
              <br />
              <input
                placeholder="Enter Year"
                type="number"
                name="year"
                value={st.year}
                onChange={change}
                style={{ marginTop: "5px" }}
              />
              <br />
              <div style={{ textAlign: "center", marginTop: "7px" }}>
                {st.id === "" ? (
                  <button
                    style={{
                      height: "30px",
                      backgroundColor: "lightgreen",
                      borderRadius: "7px",
                    }}
                  >
                    Add Student
                  </button>
                ) : (
                  <button
                    style={{
                      height: "30px",
                      backgroundColor: "GrayText",
                      borderRadius: "7px",
                    }}
                  >
                    Update Student
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
