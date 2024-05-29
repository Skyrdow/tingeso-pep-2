import React, { useState } from "react";
import { Price } from "../types";
import httpCommons from "../http-commons";
import "react-datepicker/dist/react-datepicker.css";

const AddPrice = () => {
  // region js
  const isFilled = () => {
    return (
      !priceData.id ||
      !priceData.dieselPrice ||
      !priceData.electricoPrice ||
      !priceData.gasolinaPrice ||
      !priceData.hibridoPrice
    );
  };

  const [priceData, setPriceData] = useState<Price>({
    id: 0,
    dieselPrice: 0,
    electricoPrice: 0,
    gasolinaPrice: 0,
    hibridoPrice: 0
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setPriceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    httpCommons
      .postPrice(priceData)
      .then((response) => {
        console.log(response.data);
        setPriceData({
          id: 0,
          dieselPrice: 0,
          electricoPrice: 0,
          gasolinaPrice: 0,
          hibridoPrice: 0
        });
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  // #region HTML
  return (
    <form
      onSubmit={handleSubmit}
      className="form-group priced bg-white p-4 max-w-80 h-full"
    >
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
          Id:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="patent"
          name="patent"
          value={priceData.id}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
          Precio Diesel:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="patent"
          name="patent"
          value={priceData.dieselPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
        Precio Electrico:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="patent"
          name="patent"
          value={priceData.electricoPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
        Precio Gasolina:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="patent"
          name="patent"
          value={priceData.gasolinaPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="patent">
        Precio Hibrido:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="patent"
          name="patent"
          value={priceData.hibridoPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        className={"btn max-w-80 " + (isFilled() ? "btn-error" : "btn-primary")}
        type="submit"
        disabled={isFilled()}
      >
        Añadir auto
      </button>
    </form>
  );
};

export default AddPrice;
