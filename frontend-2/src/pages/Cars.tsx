import httpCommons from "../http-commons";
import Car from "../components/Car";
import Title from "../components/Title";
import AddCar from "../components/AddCar";
import { useEffect, useState } from "react";

const Cars = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    httpCommons
      .getCars()
      .then((response) => {
        console.log(response);
        
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <Title title="Autos" svg="/car.svg"></Title>
      <div className="flex flex-row gap-5 w-full h-[700px]">
        <AddCar></AddCar>
        <section className="max-h-full w-full overflow-scroll bg-white p-5 rounded-xl shadow-xl">
          {/* titulo quiza */}
          <div className="flex">
            <table className="table bg-success/10">
              <thead>
                <tr>
                  <th>Patente</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Fecha de fabricación</th>
                  <th>Kilometraje</th>
                  <th>Asientos</th>
                  <th>Tipo de motor</th>
                  <th>Tipo de auto</th>
                  <th>Bono</th>
                </tr>
              </thead>
              <tbody>
                {data.map((car: any) => (
                  <Car data={car} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cars;
