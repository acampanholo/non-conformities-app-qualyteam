import React from "react";
import "./styles/NoCoDisplay.css";

const NoCoDisplay = (props) => {
  const renderedNoCo = props.noCo.map((noCo) => {
    try {
      return (
        <div className="noco-container" key={noCo.id}>
          <ul className="description">
            Description:
            <li>{noCo.description}</li>
          </ul>

          <ul>
            Ocurrence date:
            <li className="date">{noCo[`ocurrence-date`]}</li>
          </ul>

          <ul className="departments-list">
            Departments:
            {noCo.departments.map((deparmentItem, index) => {
              if (props.departments) {
                return (
                  <li key={index}>{props.departments[deparmentItem].name}</li>
                );
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
                  <React.Fragment key={index}>
                    <li>#{actionItem}</li>
                    <li>What: {props.coAc[actionItem - 1][`what-to-do`]}</li>
                    <li>Why: {props.coAc[actionItem - 1][`why-to-do-it`]}</li>
                    <li>How: {props.coAc[actionItem - 1][`how-to-do-it`]}</li>
                    <li>
                      Where: {props.coAc[actionItem - 1][`where-to-do-it`]}
                    </li>
                    <li>Until: {props.coAc[actionItem - 1][`until-when`]}</li>
                  </React.Fragment>
                );
              } else {
                return <li></li>;
              }
            })}
          </ul>
        </div>
      );
    } catch (error) {
      return;
    }
  });

  return <div>{renderedNoCo}</div>;
};

export default NoCoDisplay;
