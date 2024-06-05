import { useState } from "react";
import httpCommons from "../http-commons";

const Report2 = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  function getMonths(index: number) {
    const month = index - 1;
    const previousThreeMonths = [];
    for (let i = 3; i > 0; i--) {
      const previousMonthIndex = (month - i + 12) % 12;
      previousThreeMonths.push(months[previousMonthIndex]);
    }
    previousThreeMonths.push(months[month]);
    return previousThreeMonths;
  }
  const [report2, setReport2] = useState([]);

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
      .getReport2(date)
      .then((response) => {
        console.log(response.data);
        setReport2(response.data);
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
            <th>MES</th>
            {getMonths(parseInt(date.split("-")[0]))
              .reverse()
              .map((item: string, index) => (
                <>
                  <th>{item}</th>
                  {index != 3 ? <th>% Variacion</th> : <></>}
                </>
              ))}
          </tr>
        </thead>
        <tbody>
          {report2.map((item: any, index: number) => (
            <>
              <tr className={index % 2 == 0 ? "bg-amber-50" : "bg-green-50"}>
                <th>{item.reparationType}</th>
                {item.months.map((monthItem: any, inner: number) => (
                  <>
                    <td>{monthItem.count}</td>
                    {inner != 3 ? <td>{parseFloat(monthItem.countVariation)*100 + "%"}</td> : <></>}
                  </>
                ))}
              </tr>
              <tr className={index % 2 == 0 ? "bg-amber-50" : "bg-green-50"}>
                <th></th>
                {item.months.map((monthItem: any, inner: number) => (
                  <>
                    <td>{monthItem.totalPrice}</td>
                    {inner != 3 ? <td>{parseFloat(monthItem.priceVariation)*100 + "%"}</td> : <></>}
                  </>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report2;
