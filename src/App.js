import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NoCoDisplay from "./components/NoCoDisplay";
import NoCoInput from "./components/NoCoInput";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [departments, setDepartments] = useState([]);
  const [noCo, setNoCo] = useState([]);
  const [coAc, setCoAc] = useState([]);

  const [searchDate, setSearchDate] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchDept, setSearchDept] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await axios.get("http://localhost:3000/departments");
      setDepartments(departments.data);
    };

    getDepartments();

    const getNoCo = async () => {
      if (searchDate !== "") {
        const noCo = await axios.get(
          `http://localhost:3000/non-conformities?ocurrence-date=${searchDate}`
        );
        setNoCo(noCo.data);
      } else if (searchDesc !== "") {
        const noCo = await axios.get(
          `http://localhost:3000/non-conformities?description_like=${searchDesc}`
        );
        setNoCo(noCo.data);
      } else if (searchDept !== "") {
        const noCo = await axios.get(
          `http://localhost:3000/non-conformities?departments.0=${searchDept}`
        );
        setNoCo(noCo.data);
      } else {
        const noCo = await axios.get("http://localhost:3000/non-conformities");
        setNoCo(noCo.data);
      }
    };

    setTimeout(getNoCo, 500);

    const getCoAc = async () => {
      const coAc = await axios.get("http://localhost:3000/corrective-actions");
      setCoAc(coAc.data);
    };

    getCoAc();
  }, [noCo]);

  return (
    <div>
      <Header />
      <SearchBar
        setSearchDate={setSearchDate}
        setSearchDept={setSearchDept}
        setSearchDesc={setSearchDesc}
      />
      <NoCoInput departments={departments} />
      <NoCoDisplay noCo={noCo} coAc={coAc} departments={departments} />
    </div>
  );
};

export default App;
