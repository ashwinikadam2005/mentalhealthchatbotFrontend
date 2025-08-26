import React from "react";
import "./FAQSection.css";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is this chatbot for?",
      answer: "This chatbot is designed to provide mental health support and guidance."
    },
    {
      question: "Is my conversation private?",
      answer: "Yes, all conversations are kept confidential and secure."
    },
    {
      question: "Can this chatbot replace therapy?",
      answer: "No, it’s meant to support you but not replace professional therapy."
    },
    {
      question: "When can I use this chatbot?",
      answer: "You can access it anytime, 24/7."
    }
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-card">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
