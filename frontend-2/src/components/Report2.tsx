import { useEffect, useState } from "react";
import httpCommons from "../http-commons";
import Report2Table from "./Report2Table";

const Report2 = () => {
  const [report2, setReport2] = useState([]);

  useEffect(() => {
    httpCommons.getReport2().then((response) => {
      console.log(response.data);
      setReport2(response.data);
    });
  }, []);

  return (
    <section className="flex flex-wrap gap-5 p-5 justify-center m-10 mt-0">
      {report2.map((item: any) => (
        <Report2Table
          carTypes={item.carTypes}
          reparationType={item.reparationType}
        />
      ))}
    </section>
  );
};

export default Report2;
