import React from "react";
import "./styles/NoCoDisplay.css";

const NoCoDisplay = (props) => {
  const renderedNoCo = props.noCo.map((noCo) => {
    return (
      <div className="noco-container" key={noCo.id}>
        <p>Description: </p>
        <p className="description">{noCo.description}</p>
        <ul>
          Occurence date:
          <li className="date">{noCo[`ocurrence-date`]}</li>
        </ul>

        <ul className="departments-list">
          Departments:
          {noCo.departments.map((deparmentItem) => {
            if (props.departments[deparmentItem]) {
              return <li>{props.departments[deparmentItem].name}</li>;
            } else {
              return <li></li>;
            }
          })}
        </ul>
        <ul className="coac-list">
          Corrective actions:
          {noCo[`corrective-actions`].map((actionItem, index) => {
            if (props.coAc[index]) {
              return (
                <React.Fragment>
                  <li>#{props.coAc[index].id}</li>
                  <li>What: {props.coAc[index][`what-to-do`]}</li>
                  <li>Why: {props.coAc[index][`why-to-do-it`]}</li>
                  <li>How: {props.coAc[index][`how-to-do-it`]}</li>
                  <li>Where: {props.coAc[index][`where-to-do-it`]}</li>
                  <li>Until: {props.coAc[index][`until-when`]}</li>
                </React.Fragment>
              );
            } else {
              return <li></li>;
            }
          })}
        </ul>
      </div>
    );
  });

  return <div>{renderedNoCo}</div>;
};

export default NoCoDisplay;
