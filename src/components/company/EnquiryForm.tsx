"use client";
import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

interface EnquiryFormProps {
  productName?: string;
  companyName?: string;
  brandColor?: string;
  variant?: "sidebar" | "modal";
}

export default function EnquiryForm({
  productName,
  companyName,
  brandColor = "#0ea5e9",
  variant = "sidebar",
}: EnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px] animate-fade-in">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">
          Enquiry Sent!
        </h3>
        <p className="text-sm text-neutral-500">
          We have sent your details to{" "}
          <span className="font-semibold">{companyName}</span>. They will
          contact you shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-neutral-400 hover:text-neutral-900 underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="sr-only">Requirement</label>
        <textarea
          required
          rows={variant === "sidebar" ? 3 : 4}
          placeholder={`Hi, I am interested in ${productName}. Please send me the best rates...`}
          className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none text-sm font-medium resize-none transition-all placeholder:text-neutral-400"
        />
      </div>

      <div
        className={variant === "modal" ? "grid grid-cols-2 gap-3" : "space-y-3"}
      >
        <div>
          <label className="sr-only">Mobile Number</label>
          <input
            type="tel"
            required
            placeholder="Mobile Number"
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
        <div>
          <label className="sr-only">Quantity</label>
          <input
            type="text"
            placeholder="Quantity (e.g. 500)"
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
        style={{
          backgroundColor: variant === "sidebar" ? "#171717" : brandColor,
        }} // Sidebar uses generic black, Modal uses brand color
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>Send Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-neutral-400 pt-2">
        By clicking, you agree to our Terms & Privacy Policy.
      </p>
    </form>
  );
}
