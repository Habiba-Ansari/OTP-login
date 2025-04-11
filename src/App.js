import React, { useState } from 'react';
import axios from 'axios';
import "../src/App.css";

function App() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOTP = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { phone });
      alert("OTP sent");
      setStep(2);
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify-otp', { phone, otp });
      alert(`Login successful as ${res.data.role}`);
  
      // ✅ Redirect based on user role
      if (res.data.role === 'admin') {
        window.location.href = "/admin";
      } else if (res.data.role === 'employee') {
        window.location.href = "/employee";
      } else if (res.data.role === 'manager') {
        window.location.href = "/manager";
      } else {
        window.location.href = "/dashboard"; // default for customer
      }
  
    } catch (err) {
      alert("Invalid or expired OTP");
    }
  };
  

  return(
    <div className="login-container">
      {step === 1 ? (
        <div>
          <h2>Login with Phone</h2>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter with contry code" />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      ) : (
        <div>
          <h2>Enter OTP</h2>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
  
}

export default App;
