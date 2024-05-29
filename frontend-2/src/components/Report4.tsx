import { useEffect, useState } from "react";
import httpCommons from "../http-commons";
import Report4Table from "./Report4Table";

const Report2 = () => {
  const [report4, setReport4] = useState([]);

  useEffect(() => {
    httpCommons.getReport4().then((response) => {
      console.log(response.data);
      setReport4(response.data.report);
    });
  }, []);

  return (
    <section className="flex flex-wrap gap-5 p-5 justify-center m-10 mt-0">
      {report4.map((item: any) => (
        <Report4Table
          motorTypes={item.motorTypes}
          reparationType={item.reparationType}
        />
      ))}
    </section>
  );
};

export default Report2;
