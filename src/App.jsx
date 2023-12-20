import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(119);

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
      const url = `https://backend.wisechamps.com/user`;
      const res = await axios.post(url, { email: emailParam });
      const mode = res.data.mode;
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
      const url = `https://backend.wisechamps.com/payment_links`;
      const res = await axios.post(url, {
        email: emailParam,
        amount: amountParam,
      });
      setMode("payment");
      const paymentLink = res.data.short_url;
      window.location.assign(paymentLink);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <p style={{ fontSize: "18px" }}>
          {mode !== "user"
            ? "Searching best offers for you.."
            : "Generating Your Payment Link.."}
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

  if (mode === "payment") {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <p style={{ fontSize: "18px" }}>Generating Your Payment Link..</p>
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
              value="119"
              name="value-radio"
              id="value-3"
              className="radio-input"
              type="radio"
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">
              4 Quizzes at ₹119 <br /> (₹30 per quiz)
            </div>
          </label>
          <label className="label">
            <input
              value="499"
              name="value-radio"
              id="value-3"
              className="radio-input"
              type="radio"
              onChange={handleChangeAmount}
            />
            <div className="radio-design"></div>
            <div className="label-text">
              20 Quizzes at ₹499 <br /> (₹25 per quiz)
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
              200 Quizzes at ₹1999 <br /> (₹10 per quiz)
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
              window.open(
                `https://wa.me/919717094422?text=${encodeURIComponent(
                  "Please send me my registered email"
                )}`,
                "_blank"
              );
              setMode("");
            }}
          >
            Get Your Registered Email
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
