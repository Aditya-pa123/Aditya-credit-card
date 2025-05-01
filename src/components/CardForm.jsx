import React, { useState } from "react";
import "./CardForm.css";

 function CardForm() {
  const [inputForm, setInputForm] = useState({
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
  });

  const [cardPreview, setCardPreview] = useState({
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
    isFlipped: false,
  });


  const getCardType = (num) => {
    const firstnumber = num.replace(/\D/g, "");
    const firstDigit = firstnumber.charAt(0); 
    if (firstDigit === "4") return "Visa"; 
    if (firstDigit === "5") return "MasterCard";  
    if (firstDigit === "2") return "MasterCard"; 
    return "";
  };
  
  const months = [
    { label: "Jan", value: "01" },
    { label: "Feb", value: "02" },
    { label: "Mar", value: "03" },
    { label: "Apr", value: "04" },
    { label: "May", value: "05" },
    { label: "Jun", value: "06" },
    { label: "Jul", value: "07" },
    { label: "Aug", value: "08" },
    { label: "Sep", value: "09" },
    { label: "Oct", value: "10" },
    { label: "Nov", value: "11" },
    { label: "Dec", value: "12" },
  ];
  const years = Array.from({ length: 10 }, (_, i) => `${new Date().getFullYear() + i}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...inputForm };

    if (name === "number") {
      const raw = value.replace(/\D/g, "").slice(0, 16);
      updated.number = raw.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    } else {
      updated[name] = value;
    }

    setInputForm(updated);
    setCardPreview((prev) => ({ ...prev, [name]: updated[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${cardPreview.name} Card Submit Successfully`);
    setInputForm({
      number: "",
      name: "",
      month: "",
      year: "",
      cvv: "",
    });
  };

  const expiry = cardPreview.month && cardPreview.year
    ? `${cardPreview.month}/${cardPreview.year.slice(-2)}`
    : "MM/YY";

  const cardType = getCardType(cardPreview.number) || "Card Type";

  return (
    <div className="card-form-wrapper">
      <div className={`card-container ${cardPreview.isFlipped ? "flipped" : ""}`}>
        <div className="card card-front">
          <div className="card-type">{cardType}</div>
          <div className="card-number">{cardPreview.number || "#### #### #### ####"}</div>
          <div className="card-details">
            <div className="card-name">
              <span>Card Holder</span>
              <p>{cardPreview.name || "FULL NAME"}</p>
            </div>
            <div className="card-expiry">
              <span>Expires</span>
              <p>{expiry}</p>
            </div>
          </div>
        </div>

        <div className="card card-back">
          <div className="cvv-strip" />
          <div className="cvv-box">
            <label>CVV</label>
            <div className="cvv-value">{cardPreview.cvv || "***"}</div>
          </div>
        </div>

      </div> 
      <form className="card-form" onSubmit={handleSubmit} autoComplete="off">
        <br />
        <label>Card Number</label><br />
        <input
          type="text"
          name="number"
          maxLength="19"
          value={inputForm.number}
          onChange={handleChange}
        />
        <br /><br />

        <label>Card Holder</label><br />
        <input
          type="text"
          name="name"
          value={inputForm.name}
          onChange={handleChange}
        />
        <br /><br />

        <div className="form-row">
          <div>
            <label>Expiration Date</label><br />
            <select name="month" value={inputForm.month} onChange={handleChange}>
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div><br />
            <select name="year" value={inputForm.year} onChange={handleChange} className="yearselect">
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              maxLength="3"
              value={inputForm.cvv}
              onFocus={() => setCardPreview((prev) => ({ ...prev, isFlipped: true }))}
              onBlur={() => setCardPreview((prev) => ({ ...prev, isFlipped: false }))}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <button type="submit" className="Submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default CardForm;