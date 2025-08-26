import "./About.css";
export default function About() {
  return (
    <section className="about-wrapper">
      <div className="about-container container">
        <div className="about-info">
          <h2>About MentalCare 💚</h2>
          <p>
            MentalCare is a gentle AI-powered companion designed to help you
            manage stress, anxiety, and overwhelming emotions. We believe that
            mental wellness should be available to everyone — wherever they are
            and whenever they need it.
          </p>

          <h3>Why We Exist</h3>
          <p>
            Many people feel uncomfortable sharing their feelings with friends
            or family. MentalCare provides a safe, anonymous space where anyone
            can talk freely and receive calming support.
          </p>

          <h3>What We Offer</h3>
          <ul className="about-list">
            <li>✔️   Friendly AI conversations 24/7</li>
            <li>✔️   Breathing & grounding exercises for instant relief</li>
            <li>✔️   Positive reminders and coping tips</li>
            <li>✔️   Guidance to professional help when needed</li>
          </ul>
        </div>

        <img
          className="about-illustration"
          src="https://media.istockphoto.com/id/1314912771/vector/chatbot-in-healthcare-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=-kzw6tRwXqsKLzFkYntQ--NWGyYOPzUCv4ndsKJXMDQ="  /* 🌿 pastel illustration */
          alt="mental wellbeing illustration"
        />
      </div>
    </section>
  );
}
