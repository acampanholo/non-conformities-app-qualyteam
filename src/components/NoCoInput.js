import React, { useState } from "react";
import "./styles/NoCoInput.css";
import axios from "axios";

const NoCoInput = (props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [inputDepartments, setInputDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [coAcId, setCoAcId] = useState([]);
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [how, setHow] = useState("");
  const [where, setWhere] = useState("");
  const [until, setUntil] = useState("");

  const renderedSelect = props.departments.map((option) => {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          className="department-checkbox"
          id={option.id}
          name="xpto"
          value={option.id}
          onChange={(e) => {
            const depId = [];
            const checkboxes = document.querySelectorAll(
              "input[type=checkbox]:checked"
            );
            for (let i = 0; i < checkboxes.length; i++) {
              depId.push(checkboxes[i].value);
            }

            setDepartmentId(depId);
          }}
        />
        <label for={option.name}>{option.name}</label>
      </React.Fragment>
    );
  });

  let temp;

  const postFormValues = (e) => {
    e.preventDefault();

    const correctiveActions = {
      what: what,
      why: why,
      how: how,
      where: where,
      until: until,
    };

    // console.log(nonConformities);
    let temp;

    const postCoAc = async () => {
      const response = await axios
        .post("http://localhost:3000/corrective-actions", correctiveActions)
        .then((response) => {
          temp = response.data.id;
          return temp;
        });
      setCoAcId(temp);
    };

    postCoAc();

    console.log(coAcId);

    const nonConformities = {
      description: description,
      "occurence-date": date,
      departments: departmentId,
      "corrective-actions": coAcId,
    };
  };

  return (
    <form className="nocoinput-container" onSubmit={postFormValues}>
      <div className="nocoinput">
        <label for="description-input">Description: </label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="description-input"
          rows="3"
          cols="33"
        />

        <label for="date-input">Occurence date: </label>
        <input
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="text"
          id="date-input"
          placeholder="dd-mm-yyyy"
        />

        <label for="department-input">Department: </label>
        <div
          onChange={(e) => {
            setInputDepartments(e.target.value);
          }}
          name="deparment"
          id="department-input"
          className="checkbox-container">
          {renderedSelect}
        </div>
      </div>

      <div className="coacinput-container">
        Corrective actions:
        <label>What: </label>
        <textarea
          onChange={(e) => {
            setWhat(e.target.value);
          }}
          className="coacinput"
          id="what"
          rows="3"
          cols="15"
        />
        <label>Why: </label>
        <textarea
          onChange={(e) => {
            setWhy(e.target.value);
          }}
          className="coacinput"
          id="why"
          rows="3"
          cols="15"
        />
        <label>How: </label>
        <textarea
          onChange={(e) => {
            setHow(e.target.value);
          }}
          className="coacinput"
          id="how"
          rows="3"
          cols="15"
        />
        <label>Where: </label>
        <textarea
          onChange={(e) => {
            setWhere(e.target.value);
          }}
          className="coacinput"
          id="where"
          rows="3"
          cols="15"
        />
        <label>Until: </label>
        <textarea
          onChange={(e) => {
            setUntil(e.target.value);
          }}
          className="coacinput"
          id="until"
          rows="3"
          cols="15"
        />
      </div>

      <button className="ui primary button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default NoCoInput;
