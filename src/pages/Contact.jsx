import React, { useState } from "react";
import "./Contact.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("Checking authorization...");

    try {
      // Check if user is authorized with Google OAuth
      const authCheck = await fetch(`${API_BASE_URL}/contact/check_auth`, {
        credentials: "include",  // important to send cookies
      });

      if (authCheck.status === 401) {
        // Not authorized, redirect to Google OAuth login flow
        window.location.href = `${API_BASE_URL}/contact/authorize`;
        return;
      }

      setStatus("Sending...");

      // Now user is authorized, send the email
      const response = await fetch(`${API_BASE_URL}/contact/send_email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for session cookie
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus("Failed to send message");
      console.error("Contact form error:", error);
    }
  };

  return (
    <section className="contact container">
      <h2 className="section-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="contact-input"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="contact-input"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="contact-input"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="contact-btn" type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
}
