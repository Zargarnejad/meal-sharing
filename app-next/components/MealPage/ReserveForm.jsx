"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function ReserveForm({ meal, onSuccess, onClose }) {
  const [submitState, setSubmitState] = useState("NOT_SUBMITTED");
  const [validationError, setValidationError] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCloseButton = (e) => {
    e.preventDefault();
    onClose();
  }

  const submitForm = (e) => {
    if (contactName.trim().length === 0) {
      setSubmitState("VALIDATION_FAILED");
      setValidationError("Name can not be empty");
      return;
    }

    if (!isValidEmail(contactEmail)) {
      setSubmitState("VALIDATION_FAILED");
      setValidationError("Email address is invalid");
      return;
    }

    if (
      String(contactPhoneNumber).length != 8 ||
      Number.isNaN(contactPhoneNumber)
    ) {
      setSubmitState("VALIDATION_FAILED");
      setValidationError(
        "Phone number is required and must be a 8 digit number"
      );
      return;
    }

    const reserveSeat = async () => {
      const reserveResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact_phonenumber: Number(contactPhoneNumber),
            contact_name: contactName,
            contact_email: contactEmail,
            meal_id: meal.id,
            number_of_guests: 1,
          }),
        }
      ).catch((e) => {
        setSubmitState("SUBMIT_FAILED");
      });

      if (reserveResponse.status !== 201) {
        setSubmitState("SUBMIT_FAILED");
        console.log(await reserveResponse.json().then((json) => json.error));
      } else {
        setSubmitState("SUBMIT_SUCCEEDED");
        setContactName("");
        setContactEmail("");
        setContactPhoneNumber("");
        onSuccess();
      }
    };

    reserveSeat();
    setSubmitState("NOT_SUBMITTED");
  };

  // Prepare a message to show in the page in case of error or loading
  let message = <></>;
  switch (submitState) {
    case "SUBMIT_FAILED":
      message = (
        <div className="errorMessage">
          Booking a seat failed. Please try again later ;(
        </div>
      );
      break;
    case "SUBMIT_SUCCEEDED":
      message = <div className="successMessage">One seat booked.</div>;
      break;
    case "VALIDATION_FAILED":
      message = <div className="errorMessage">{validationError}</div>;
      break;
  }

  return (
    <div className="formContainer">
      <form className="form">
        <div className="formTitleContainer">
          <h3>You can book a seat here</h3>
          <button onClick={handleCloseButton}>X</button>
        </div>
        {message}
        <div className="formRowsContainer">
          <div>Name:</div>
          <div className="formInputContainer">
            <input
              className="formInput"
              type="text"
              name="contact_name"
              id="contact_name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div>E-Mail:</div>
          <div className="formInputContainer">
            <input
              className="formInput"
              type="email"
              name="contact_email"
              id="contact_email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <div>Phone:</div>
          <div className="formInputContainer">
            <input
              className="formInput"
              type="text"
              name="contact_phonenumber"
              id="contact_phonenumber"
              value={contactPhoneNumber}
              onChange={(e) => setContactPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="formButtonsContainer">
          <button
            className="submitBtn"
            type="button"
            onClick={(e) => {
              submitForm(e);
            }}
          >
            Book seat
          </button>
        </div>
      </form>
    </div>
  );
}
