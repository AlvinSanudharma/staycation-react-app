import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { InputDate, InputNumber } from "elements/Form";
import Button from "elements/Button";
import { checkoutBooking } from "store/actions/checkout";

function BookingForm_() {
  const mounted = useRef(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    duration: 1,
    date: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });
  const page = useSelector((state) => state.page);
  const { id } = useParams();

  const itemDetails = page?.[id] || {};

  function updateData(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function startBooking() {
    dispatch(
      checkoutBooking({
        _id: itemDetails._id,
        duration: data.duration,
        date: {
          startDate: data.date.startDate,
          endDate: data.date.endDate,
        },
      })
    );

    navigate("/checkout");
  }

  useLayoutEffect(() => {
    if (mounted.current) {
      mounted.current = false;
      return;
    }

    const startDate = new Date(data.date.startDate);
    const endDate = new Date(data.date.endDate);
    const countDuration = new Date(endDate - startDate).getDate();

    setData((prev) => ({
      ...prev,
      duration: countDuration,
    }));
  }, [data.date]);

  useLayoutEffect(() => {
    if (mounted.current) {
      mounted.current = false;
      return;
    }

    const startDate = new Date(data.date.startDate);
    const endDate = new Date(
      startDate.setDate(startDate.getDate() + +data.duration - 1)
    );

    setData((prev) => ({
      ...prev,
      date: {
        ...prev.date,
        endDate,
      },
    }));
  }, [data.duration]);

  return (
    <div className="card bordered" style={{ padding: "60px 80px" }}>
      <h4 className="mb-3">Start Booking</h4>
      <h5 className="h2 text-teal mb-3">
        ${itemDetails.price}{" "}
        <span className="text-gray-500 font-weight-light">
          per {itemDetails.unit}
        </span>
      </h5>
      <label htmlFor="duration">How long you will stay?</label>
      <InputNumber
        max={30}
        suffix=" night"
        isSuffixPlural
        name="duration"
        value={data.duration}
        onChange={updateData}
      />
      <label htmlFor="date">Pick a Date</label>
      <InputDate name="date" value={data.date} onChange={updateData} />
      <h6
        className="text-gray-500 font-weight-light"
        style={{ marginBottom: 40 }}
      >
        You will pay{" "}
        <span className="text-gray-900">
          ${itemDetails.price * data.duration} USD
        </span>{" "}
        per{" "}
        <span className="text-gray-900">
          {data.duration} {itemDetails.unit}
        </span>
      </h6>
      <Button
        className="btn"
        isBlock
        hasShadow
        isPrimary
        onClick={startBooking}
      >
        Continue to Book
      </Button>
    </div>
  );
}

export default BookingForm_;
