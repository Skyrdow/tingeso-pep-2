import { useEffect, useState } from "react";
import httpCommons from "../http-commons";
import Report1Table from "./Report1Table";

const Report1 = () => {
  const [report1, setReport1] = useState([]);

  const [date, setDate] = useState("4-2024");
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setDate(value);
  };
  function handleClick(event: React.FormEvent) {
    event.preventDefault();
    httpCommons
      .getReport1(date)
      .then((response) => {
        console.log(response.data);
        setReport1(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-xl flex flex-col items-center gap-4">
      <form className="flex flex-wrap gap-4" onSubmit={handleClick}>
        <div className="form-field">
          <label className="form-label" htmlFor="monthYear">
            Mes y Año:
          </label>
          <input
            className="input input-ghost-success"
            type="text"
            id="monthYear"
            name="monthYear"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <button className="btn btn-primary self-end" type="submit">
          Buscar
        </button>
      </form>
      <table className="table bg-success/10">
        <thead>
          <tr>
            <th>Lista de reparaciones</th>
            <th>Sedan</th>
            <th>Hatchback</th>
            <th>SUV</th>
            <th>Pickup</th>
            <th>Furgoneta</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {report1.map((item: any, index: number) => (
            <>
              <tr className={(index % 2 == 0) ? "bg-amber-50" : "bg-green-50"}>
                <th>{item.reparationType}</th>
                {item.carTypes.map((carItem: any) => (
                  <td>{carItem.count}</td>
                ))}
                <th>{item.carTypes.reduce((acc: number, carItem: any) => acc + carItem.count, 0)}</th>
              </tr>
              <tr className={(index % 2 == 0) ? "bg-amber-50" : "bg-green-50"}>
                <th></th>
                {item.carTypes.map((carItem: any) => (
                  <td>{carItem.totalPrice}</td>
                ))}
                <th>{item.carTypes.reduce((acc: number, carItem: any) => acc + carItem.totalPrice, 0)}</th>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report1;
