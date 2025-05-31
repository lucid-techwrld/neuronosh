import React, { useEffect, useRef } from "react";
import { useState } from "react";

const OTPpage = () => {
  const [otp, setOTP] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    let newOtp = [...otp];

    newOtp[index] = value;
    setOTP(newOtp);

    console.log(newOtp);
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    console.log("OTP entered:", fullOtp);
  };

  useEffect(() => {
    console.log("otp", otp);
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-[80%] lg:w-[60%] bg-white rounded-lg shadow-2xl transition-shadow flex flex-col justify-center items-center space-y-5 py-10"
      >
        <h1 className="font-bold text-2xl">Verify Acount</h1>
        <p className="text-center">
          OTP has been sent to da********999@gamil.com. <br /> Fill the OTP
          Below
        </p>
        <div className="flex gap-2">
          {otp.map((value, index) => (
            <input
              type="text"
              name="otp"
              key={index}
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-11 h-11 bg-transparent border-2 border-black rounded-lg otp text-center text-xl"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-5 bg-black text-white px-4 py-2 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPpage;
