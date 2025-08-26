import "./Testimonials.css";

export default function Testimonials() {
  return (
    <section className="testimonials container">
      <h2 className="section-title">What People Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p>"This chatbot helped me through a tough time. Highly recommended!"</p>
          <span>- Anonymous</span>
        </div>
        <div className="testimonial-card">
          <p>"I love how private and supportive it feels. A safe space to talk."</p>
          <span>- Anonymous</span>
        </div>
      </div>
    </section>
  );
}
