import { useState } from "react";
import Title from "../components/Title";
import Report1 from "../components/Report1";
import Report2 from "../components/Report2";

const Reports = () => {
  const [report, setReport] = useState(1);
  const changeReport = (index: number) => {
    setReport(index);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Title title="Reportes" svg="/report.svg"></Title>
      <div className="pagination bg-white p-2 rounded-xl shadow-xl">
        {[1, 2].map((num) => (
          <button
            className={"btn " + (report == num ? "btn-active" : "")}
            onClick={() => changeReport(num)}
          >
            {num}
          </button>
        ))}
      </div>
      {report === 1 && <Report1 />}
      {report === 2 && <Report2 />}
    </div>
  );
};

export default Reports;
