import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import toast notifications

const ReferAndEarn = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ referrerName: "", referrerEmail: "", refereeName: "", refereeEmail: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.referrerName || !formData.referrerEmail || !formData.refereeName || !formData.refereeEmail) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("https://accredian-backend-task-bu4s.onrender.com/api/referrals", formData);

      toast.success("🎉 Referral submitted successfully!", { duration: 3000 }); // Success toast
      setOpen(false);
    } catch (err) {
      toast.error("❌ Error submitting referral. Try again!", { duration: 3000 }); // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-6xl font-extrabold text-center mb-4 drop-shadow-lg">Refer & Earn</h1>
      <p className="text-lg text-center max-w-md opacity-90">
        Invite your friends and get rewarded! Fill out the form and earn exclusive benefits.
      </p>

      {/* Refer Now Button */}
      <button
        className="mt-8 px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-full shadow-xl 
        hover:bg-gray-100 hover:scale-105 transition-transform duration-300 ease-in-out"
        onClick={() => setOpen(true)}
      >
        Refer Now 🚀
      </button>

      {/* Popup Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 relative">
          <DialogTitle className="text-indigo-600 font-bold text-xl text-center">
            Refer a Friend 🎉
          </DialogTitle>

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
              <CircularProgress size={50} color="primary" />
              <p className="mt-2 text-indigo-600 font-semibold">Submitting...</p>
            </div>
          )}

          <DialogContent className="p-6 space-y-4">
            <TextField fullWidth label="Your Name" name="referrerName" onChange={handleChange} required disabled={loading} />
            <TextField fullWidth label="Your Email" name="referrerEmail" onChange={handleChange} required type="email" disabled={loading} />
            <TextField fullWidth label="Friend's Name" name="refereeName" onChange={handleChange} required disabled={loading} />
            <TextField fullWidth label="Friend's Email" name="refereeEmail" onChange={handleChange} required type="email" disabled={loading} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </DialogContent>

          <DialogActions className="flex justify-center pb-6">
            <Button
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              disabled={loading}
            >
              Submit ✅
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ReferAndEarn;
