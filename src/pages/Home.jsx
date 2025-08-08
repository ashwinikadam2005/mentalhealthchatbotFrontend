import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Calm your mind. Start a friendly chat.</h1>
        <p className="lead">
          MentalCare is here to listen, guide, and provide simple coping exercises and resources — anytime.
        </p>
        <div className="cta-row">
          <Link to="/signup" className="btn large">Get Started</Link>
          <Link to="/about" className="btn btn-outline large">Learn More</Link>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-title">Anonymous & Safe</div>
            <p>Chat without sharing personal details — your privacy is respected.</p>
          </div>
          <div className="feature-card">
            <div className="feature-title">Quick Exercises</div>
            <p>Breathing & grounding exercises to calm immediate stress.</p>
          </div>
          <div className="feature-card">
            <div className="feature-title">Escalation</div>
            <p>When needed, we guide you to human support and hotlines.</p>
          </div>
        </div>
      </div>

      <aside className="hero-right">
        <div className="mock-chat">
          <div className="chat-header">MentalCare • Chat</div>
          <div className="chat-body">
            <div className="msg bot">Hi, I'm MentalCare. How are you feeling today?</div>
            <div className="msg user">A bit anxious...</div>
            <div className="msg bot">I'm sorry to hear. Do you want a breathing exercise?</div>
          </div>
          <div className="chat-actions">
            <button className="btn small">Yes, please</button>
            <button className="btn btn-outline small">Not now</button>
          </div>
        </div>
      </aside>
    </section>
  );
}
