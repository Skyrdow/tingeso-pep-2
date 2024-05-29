import httpCommons from "../http-commons";
import Price from "../components/Price";
import Title from "../components/Title";
import AddPrice from "../components/AddPrice";
import { useEffect, useState } from "react";

const Prices = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    httpCommons
      .getPrice()
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
      <Title title="Precios de Reparación" svg="/repair.svg"></Title>
      <div className="flex flex-row gap-5 w-full h-[700px]">
        <AddPrice></AddPrice>
        <section className="max-h-full w-full overflow-scroll bg-white p-5 rounded-xl shadow-xl">
          {/* titulo quiza */}
          <div className="flex">
            <table className="table-zebra table bg-success/10">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Gasolina</th>
                  <th>Diesel</th>
                  <th>Hibrido</th>
                  <th>Eléctrico</th>
                </tr>
              </thead>
              <tbody>
                {data.map((price: any) => (
                  <Price data={price} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Prices;
