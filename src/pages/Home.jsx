import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Chatbot from "./Chatbot"; // NEW import
import "./Home.css";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate("/login");
    } else {
      setChatOpen(true);
    }
  };

  return (
    <section className="hero">
      {/* --- LEFT CONTENT --- */}
      <div className="hero-left">
        <h1>Your Mind Matters. Let's Talk.</h1>
        <p className="lead">
          MentalCare is your friendly, safe space to share what’s on your mind,
          explore calming exercises, and get support whenever you need it.
        </p>

        <div className="cta-row">
          <button onClick={handleGetStarted} className="btn large">
            Get Started
          </button>
          <Link to="/about" className="btn btn-outline large">
            Learn More
          </Link>
        </div>

        <p className="sub-text">
          No judgment. No pressure. Just a space where your feelings matter.
          Available 24/7 with guidance, coping tools, and a listening ear.
        </p>
      </div>

      {/* --- MOCK PREVIEW (unchanged) --- */}
      <aside className="hero-right">
        <div className="mock-preview">
          <div className="mock-preview-header">MentalCare • Chat</div>
          <div className="mock-preview-body">
            <div className="mock-preview-msg bot">
              Hi, I'm MentalCare. How are you feeling today?
            </div>
            <div className="mock-preview-msg user">A bit anxious...</div>
            <div className="mock-preview-msg bot">
              That’s okay. Would you like to try a 2-minute breathing exercise
              with me?
            </div>
            <div className="mock-preview-msg user">Yes, please.</div>
            <div className="mock-preview-msg bot">
              Great! Let’s begin: Inhale… 2… 3… Hold… 2… 3… Exhale…
            </div>
          </div>
          <div className="mock-preview-actions">
            <button className="btn small">Start Exercise</button>
            <button className="btn btn-outline small">Skip</button>
          </div>
        </div>
      </aside>

      {/* --- FLOATING ICON --- */}
      {user && (
        <div
          className="chatbot-icon"
          onClick={() => setChatOpen(!chatOpen)}
          title="Chat with us"
        >
          💬
        </div>
      )}

      {/* --- REAL CHATBOT POPUP --- */}
      {chatOpen && (
        <div className="chat-popup">
          <Chatbot onClose={() => setChatOpen(false)} />
        </div>
      )}
    </section>
  );
}
