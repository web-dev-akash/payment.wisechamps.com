import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(39);

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangeAmount = (e) => {
    const amount = Number(e.target.value);
    setAmount(amount);
  };

  const handleClick = async (emailParam) => {
    if (!emailRegex.test(emailParam)) {
      alert("Please Enter a Valid Email");
      window.location.reload();
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `https://script.google.com/macros/s/AKfycbzfelbwgNpG1v4zY8t-avVggcgH3K_7yE-r7B7eTWF45lt1q_guT4qaQTaEiYccHy-b/exec?email=${emailParam}&type=payment&description=EnteredEmail`
      );
      const url = `https://backend.wisechamps.app/user`;
      const res = await axios.post(url, { email: emailParam });
      const mode = res.data.mode;
      const status = res.data.status;
      console.log(status);
      await axios.post(
        `https://script.google.com/macros/s/AKfycbzfelbwgNpG1v4zY8t-avVggcgH3K_7yE-r7B7eTWF45lt1q_guT4qaQTaEiYccHy-b/exec?email=${emailParam}&type=payment&description=${mode}-${status}`
      );
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handlePayment = async (emailParam, amountParam) => {
    try {
      setLoading(true);
      await axios.post(
        `https://script.google.com/macros/s/AKfycbzfelbwgNpG1v4zY8t-avVggcgH3K_7yE-r7B7eTWF45lt1q_guT4qaQTaEiYccHy-b/exec?email=${emailParam}&type=payment&description=AmountSelected ${amountParam}`
      );
      const url = `https://backend.wisechamps.app/payment_links`;
      const res = await axios.post(url, {
        email: emailParam,
        amount: amountParam,
      });
      const paymentLink = res.data.short_url;
      window.location.assign(paymentLink);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <p style={{ fontSize: "18px" }}>
          {mode !== "user" ? "Loading.." : "Generating Your Payment Link.."}
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </div>
    );
  }

  if (mode === "user") {
    return (
      <div>
        <div className="radio-input-wrapper">
          <label className="label">
            <input
              value="39"
              name="value-radio"
              id="value-2"
              className="radio-input"
              type="radio"
              defaultChecked
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">1 Quiz at ₹39</div>
          </label>
          <label className="label">
            <input
              value="119"
              name="value-radio"
              id="value-3"
              className="radio-input"
              type="radio"
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">
              4 Quizzes at ₹119 <br /> (₹29 per quiz)
            </div>
          </label>
          <label className="label">
            <input
              value="999"
              name="value-radio"
              id="value-4"
              className="radio-input"
              type="radio"
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">
              52 Quizzes at ₹999 <br /> (₹19 per quiz)
            </div>
          </label>
          <label className="label">
            <input
              value="1999"
              name="value-radio"
              id="value-4"
              className="radio-input"
              type="radio"
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">
              200 Quizzes at ₹1999 <br /> (₹9 per quiz)
            </div>
          </label>
          <button
            style={{ marginTop: "20px" }}
            id="submit-btn"
            onClick={() => handlePayment(email, amount)}
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something Went Wrong. Please Refresh</h1>
      </div>
    );
  }

  if (mode === "nouser") {
    return (
      <div className="email-not-found">
        <p>
          This Email is not registered with us. <br />
          Please use a registered Email Address
        </p>
        <div>
          <button id="submit-btn" onClick={() => setMode("")}>
            Try Again
          </button>
          <button
            id="submit-btn"
            onClick={() => {
              window.open(`https://wa.me/919717094422`, "_blank");
              setMode("");
            }}
          >
            Know Your Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <h3>Email</h3>
      <div className="form">
        <input
          className="input"
          type="email"
          placeholder="Enter Email"
          inputMode="email"
          onChange={handleChange}
        />
        <p>* Please use the registered Email.</p>
        <button id="submit-btn" onClick={() => handleClick(email)}>
          Submit
        </button>
      </div>
    </div>
  );
};
