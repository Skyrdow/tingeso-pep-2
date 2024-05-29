import { useEffect, useState } from "react";
import Title from "../components/Title";
import httpCommons from "../http-commons";
import Reparation from "../components/Reparation";
import AddReparation from "../components/AddReparation";
import { Reparation as ReparationT } from "../types";

const Reparations = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    httpCommons
      .getReparations()
      .then((response) => {
        console.log(response.data);
        setData(response.data.reparations);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <Title title="Reparaciones" svg="/repair.svg"></Title>
      <div className="flex flex-row gap-5 w-full h-[780px]">
        <AddReparation></AddReparation>
        <section className="max-h-full w-full overflow-scroll bg-white p-5 rounded-xl shadow-xl">
          {/* titulo quiza */}
          <div className="flex">
            <table className="table-zebra table bg-success/10">
              <thead>
                <tr>
                  <th>Patente</th>
                  <th>Fecha de admisión</th>
                  <th>Salida de reparación</th>
                  <th>Fecha de retirada</th>
                  <th>Tipos de reparación</th>
                </tr>
              </thead>
              <tbody>
                {data.map((reparation: ReparationT, index) => (
                  <Reparation data={reparation} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reparations;
