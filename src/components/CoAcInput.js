import React from "react";

const temp = ["a"];

const CoAcInput = (props) => {
  const renderCoAcInput = props.inputArrayCounter.map((temp, index) => {
    return (
      <div className="coacinput-container" key={index}>
        Corrective actions:
        <label>What: </label>
        <textarea
          name={`what${props.inputCounter}`}
          onChange={(e) => {
            props.setCoacInput((state) => ({
              ...props.coacInput,
              [`what${props.inputCounter}`]: e.target.value,
            }));
          }}
          className="coacinput"
          id={`what${props.inputCounter}`}
          rows="3"
          cols="15"
        />
        <label>Why: </label>
        <textarea
          name={`why${props.inputCounter}`}
          onChange={(e) => {
            props.setCoacInput((state) => ({
              ...props.coacInput,
              [`why${props.inputCounter}`]: e.target.value,
            }));
          }}
          className="coacinput"
          id="why"
          rows="3"
          cols="15"
        />
        <label>How: </label>
        <textarea
          name={`how${props.inputCounter}`}
          onChange={(e) => {
            props.setCoacInput((state) => ({
              ...props.coacInput,
              [`how${props.inputCounter}`]: e.target.value,
            }));
          }}
          className="coacinput"
          id="how"
          rows="3"
          cols="15"
        />
        <label>Where: </label>
        <textarea
          name={`where${props.inputCounter}`}
          onChange={(e) => {
            props.setCoacInput((state) => ({
              ...props.coacInput,
              [`where${props.inputCounter}`]: e.target.value,
            }));
          }}
          className="coacinput"
          id="where"
          rows="3"
          cols="15"
        />
        <label>Until: </label>
        <textarea
          name={`until${props.inputCounter}`}
          onChange={(e) => {
            props.setCoacInput((state) => ({
              ...props.coacInput,
              [`until${props.inputCounter}`]: e.target.value,
            }));
          }}
          className="coacinput"
          id="until"
          rows="3"
          cols="15"
        />
      </div>
    );
  });

  return <React.Fragment>{renderCoAcInput}</React.Fragment>;
};

export default CoAcInput;
