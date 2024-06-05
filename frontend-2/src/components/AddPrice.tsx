import React, { useState } from "react";
import { Price } from "../types";
import httpCommons from "../http-commons";
import "react-datepicker/dist/react-datepicker.css";

const AddPrice = () => {
  // region js
  const isFilled = () => {
    return (
      false
    );
  };

  const [priceData, setPriceData] = useState<Price>({
    id: 0,
    dieselPrice: 0,
    electricoPrice: 0,
    gasolinePrice: 0,
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
          gasolinePrice: 0,
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
      className="form-group card bg-white p-4 max-w-80 h-full"
    >
      <div className="form-field">
        <label className="form-label" htmlFor="id">
          Id:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="id"
          name="id"
          value={priceData.id}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="gasolinaPrice">
        Precio Gasolina:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="gasolinaPrice"
          name="gasolinePrice"
          value={priceData.gasolinePrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="dieselPrice">
          Precio Diesel:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="dieselPrice"
          name="dieselPrice"
          value={priceData.dieselPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="hibridoPrice">
        Precio Hibrido:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="hibridoPrice"
          name="hibridoPrice"
          value={priceData.hibridoPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="electricoPrice">
        Precio Electrico:
        </label>
        <input
          className="input input-ghost-success"
          type="number"
          id="electricoPrice"
          name="electricoPrice"
          value={priceData.electricoPrice}
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
