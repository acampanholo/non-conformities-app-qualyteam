import React, { useState } from "react";
import "./styles/NoCoInput.css";
import axios from "axios";
import CoAcInput from "./CoAcInput";
import CoAcObject from "./modules/CoAcObject";

const inputArrayCounter = ["a"];
const correctiveActions = [];

const NoCoInput = (props) => {
  const [inputCounter, setInputCounter] = useState(1);
  const [coacInput, setCoacInput] = useState({});
  const [nocoInput, setNocoInput] = useState({});

  const renderedSelect = props.departments.map((option, index) => {
    return (
      <div key={index} className="checkbox-pair">
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
            if (checkboxes.length) {
              for (let i = 0; i < checkboxes.length; i++) {
                depId.push(parseInt(checkboxes[i].value - 1));
              }
              setNocoInput((state) => ({
                ...nocoInput,
                depId: depId,
              }));
            } else {
              depId.push(3);
              setNocoInput((state) => ({
                ...nocoInput,
                depId: depId,
              }));
            }

            console.log(depId);
          }}
        />
        <label for={option.id}>{option.name}</label>
      </div>
    );
  });

  const postFormValues = async (e) => {
    e.preventDefault();
    let nonConformities = {};

    if (
      nocoInput.description &&
      nocoInput.date &&
      nocoInput.depId &&
      coacInput[`what${inputCounter}`] &&
      coacInput[`why${inputCounter}`] &&
      coacInput[`how${inputCounter}`] &&
      coacInput[`where${inputCounter}`] &&
      coacInput[`until${inputCounter}`]
    ) {
      correctiveAction = new CoAcObject();
      correctiveAction[`what-to-do`] = coacInput[`what${inputCounter}`];
      correctiveAction[`why-to-do-it`] = coacInput[`why${inputCounter}`];
      correctiveAction[`how-to-do-it`] = coacInput[`how${inputCounter}`];
      correctiveAction[`where-to-do-it`] = coacInput[`where${inputCounter}`];
      correctiveAction[`until-when`] = coacInput[`until${inputCounter}`];
      correctiveActions.push(correctiveAction);
    } else {
      alert("Please fill all fields");
      return;
    }

    const postCoAc = async () => {
      const postVariables = correctiveActions.map(
        async (correctiveAction, index) => {
          const promise = await axios
            .post("http://localhost:3000/corrective-actions", correctiveAction)
            .catch((error) => {
              alert("Error. Please refresh the page and try again.");
            });
          return promise.data;
        }
      );

      const responsesCoAc = await Promise.all(
        postVariables.map((responseCoAc) => {
          return responseCoAc;
        })
      );

      const ids = responsesCoAc.map((response) => {
        return response.id;
      });

      console.log(ids);

      if (nocoInput.description && nocoInput.date && nocoInput.depId) {
        nonConformities = {
          description: nocoInput.description,
          "ocurrence-date": nocoInput.date,
          departments: nocoInput.depId,
          "corrective-actions": ids,
        };
      } else {
        alert("Please fill all fields.");
        return;
      }

      const responsesNoCo = await axios
        .post("http://localhost:3000/non-conformities", nonConformities)
        .then(alert("Nonconformity successfully added."))
        .catch((error) => {
          alert("Error. Please refresh the page and try again.");
        });
    };

    postCoAc();
  };

  let correctiveAction;

  const handleInputCounter = (e) => {
    e.preventDefault();
    inputArrayCounter.unshift("a");
    setInputCounter(inputCounter + 1);

    if (
      nocoInput.description &&
      nocoInput.date &&
      nocoInput.depId &&
      coacInput[`what${inputCounter}`] &&
      coacInput[`why${inputCounter}`] &&
      coacInput[`how${inputCounter}`] &&
      coacInput[`where${inputCounter}`] &&
      coacInput[`until${inputCounter}`]
    ) {
      correctiveAction = new CoAcObject();
      correctiveAction[`what-to-do`] = coacInput[`what${inputCounter}`];
      correctiveAction[`why-to-do-it`] = coacInput[`why${inputCounter}`];
      correctiveAction[`how-to-do-it`] = coacInput[`how${inputCounter}`];
      correctiveAction[`where-to-do-it`] = coacInput[`where${inputCounter}`];
      correctiveAction[`until-when`] = coacInput[`until${inputCounter}`];

      correctiveActions.push(correctiveAction);
    }
  };

  const handleInputDelete = (e) => {
    e.preventDefault();
    if (inputCounter !== 1) {
      inputArrayCounter.shift("a");
      setInputCounter(inputCounter - 1);
    }
  };

  return (
    <form className="nocoinput-container">
      <div className="nocoinput">
        <label className="input-label" for="description-input">
          Description:{" "}
        </label>
        <textarea
          onChange={(e) => {
            setNocoInput((state) => ({
              ...nocoInput,
              description: e.target.value,
            }));
          }}
          id="description-input"
          rows="3"
          cols="33"
        />

        <label className="input-label" for="date-input">
          Occurence date:{" "}
        </label>
        <input
          onChange={(e) => {
            setNocoInput((state) => ({
              ...nocoInput,
              date: e.target.value,
            }));
          }}
          type="text"
          id="date-input"
          placeholder="dd-mm-yyyy"
        />

        <label className="input-label" for="department-input">
          Department:{" "}
        </label>
        <div
          name="department"
          id="department-input"
          className="checkbox-container">
          {renderedSelect}
        </div>
      </div>

      <div>
        <CoAcInput
          inputCounter={inputCounter}
          coacInput={coacInput}
          setCoacInput={setCoacInput}
          inputArrayCounter={inputArrayCounter}
        />
      </div>
      <div className="button-container">
        <button
          className="submit-button"
          type="submit"
          onClick={postFormValues}>
          Submit
        </button>
        <button
          type="button"
          className="coac-button"
          onClick={handleInputCounter}>
          New corrective action
        </button>
        <button
          type="button"
          className="coac-button"
          onClick={handleInputDelete}>
          Delete corrective action fields
        </button>
        <button type="reset">Clear</button>
      </div>
    </form>
  );
};

export default NoCoInput;
