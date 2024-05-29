import { useEffect, useState } from "react";
import httpCommons from "../http-commons";

const Report3 = () => {
  const [report3, setReport3] = useState([]);
  useEffect(() => {
    console.log("Report 3");
    httpCommons
      .getReport3()
      .then((response) => {
        console.log(response.data);
        setReport3(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="flex w-fit overflow-x-auto bg-white rounded-xl shadow-lg m-10 mt-0 p-5">
      <table className="table-zebra table bg-success/10">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Tiempo promedio</th>
          </tr>
        </thead>
        <tbody>
          {report3
            .sort((a: any, b: any) => a.time - b.time)
            .map((item: any) => (
              <tr>
                <th>{item.brand}</th>
                <td>{convertTime(item.time)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  function convertTime(time: number): string {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  }
};

export default Report3;
