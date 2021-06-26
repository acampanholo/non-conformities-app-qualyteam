import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NoCoDisplay from "./components/NoCoDisplay";
import NoCoInput from "./components/NoCoInput";

const App = () => {
  const [departments, setDepartments] = useState([]);
  const [noCo, setNoCo] = useState([]);
  const [coAc, setCoAc] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await axios.get("http://localhost:3000/departments");
      setDepartments(departments.data);
    };

    getDepartments();

    const getNoCo = async () => {
      const noCo = await axios.get("http://localhost:3000/non-conformities");
      setNoCo(noCo.data);
    };

    getNoCo();

    const getCoAc = async () => {
      const coAc = await axios.get("http://localhost:3000/corrective-actions");
      setCoAc(coAc.data);
    };

    getCoAc();
  }, []);

  return (
    <div>
      <Header />
      <NoCoInput
        departments={departments}
        // setDescription={setDescription}
        // setDate={setDate}
        // setInputDepartments={setInputDepartments}
        // setWhat={setWhat}
        // setWhy={setWhy}
        // setHow={setHow}
        // setWhere={setWhere}
        // setUntil={setUntil}
      />
      <NoCoDisplay noCo={noCo} coAc={coAc} departments={departments} />
    </div>
  );
};

export default App;
