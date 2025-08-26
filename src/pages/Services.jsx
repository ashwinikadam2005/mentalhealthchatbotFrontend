import { useState, useEffect } from "react";
import "./Services.css";

export default function Services() {
  const API_URL = "http://localhost:5000/api/journal"; // ✅ adjust if deployed
  const token = localStorage.getItem("token"); // JWT from login

  // 🎥 YouTube video IDs
  const videos = ["inpok4MKVLM", "ZToicYcHIOU", "VaoV1PrYft4", "O-6f5wQXSu8", "a8K-0jV3j6I"];
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 12000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => setStartIndex((prev) => (prev + 3) % videos.length);
  const handlePrev = () => setStartIndex((prev) => (prev - 3 + videos.length) % videos.length);

  // 🌞 Daily motivation
  const quotes = [
    "You are stronger than you think 🌟",
    "Take a deep breath and start again 💙",
    "Every small step matters 🚀",
    "Peace begins with a smile 🙂",
    "Your mind is a powerful thing 💡"
  ];
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, [quotes]);

  // ✍️ Digital Journaling
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);

  // ✅ Fetch journal entries from backend
  useEffect(() => {
    if (!token) return; // if not logged in
    fetch(`${API_URL}/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setEntries(data);
      })
      .catch((err) => console.error("Error fetching journals:", err));
  }, [token]);

  // ✅ Save new entry to backend
  const handleSaveJournal = async () => {
    if (journal.trim() === "") return alert("⚠️ Please write something first.");
    if (!token) return alert("⚠️ Please log in to save your journal.");

    try {
      const res = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ entry: journal })
      });

      const data = await res.json();
      if (res.ok) {
        // update list instantly
        const newEntry = { entry: journal, created_at: new Date().toISOString() };
        setEntries([newEntry, ...entries]);
        setJournal("");
        alert("✅ Journal entry saved!");
      } else {
        alert("❌ " + (data.error || "Failed to save entry"));
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Could not connect to server.");
    }
  };

  return (
    <section className="services-wrapper">
      <div className="container">
        <h2 className="services-title">Our Services</h2>

        {/* --- SERVICE CARDS --- */}
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💬</div>
            <h3>24×7 AI Support</h3>
            <p>Talk to a calm AI companion anytime you’re feeling overwhelmed.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌿</div>
            <h3>Breathing Exercises</h3>
            <p>Follow easy step-by-step breathing techniques to regain balance.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📊</div>
            <h3>Mood Tracking</h3>
            <p>Record your daily mood and discover patterns in your emotions.</p>
          </div>
        </div>

        {/* 🎥 Guided Video Sessions */}
        <div className="video-section">
          <button className="nav-btn" onClick={handlePrev}>⏮</button>
          <div className="videos-container">
            {videos.slice(startIndex, startIndex + 3).map((video, idx) => (
              <div key={idx} className="video-card">
                <iframe
                  width="100%"
                  height="220"
                  src={`https://www.youtube.com/embed/${video}?autoplay=0&mute=0`}
                  title={`Guided Video ${idx}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
          <button className="nav-btn" onClick={handleNext}>⏭</button>
        </div>

        {/* --- SECOND ROW --- */}
        <div className="services-grid">
          {/* ✍️ Digital Journaling */}
          <div className="service-card">
            <div className="service-icon">✍️</div>
            <h3>Digital Journaling</h3>
            <p>Write your thoughts daily and reflect on your journey.</p>
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Write your thoughts here..."
              rows="4"
              className="journal-box"
            ></textarea>
            <button className="save-btn" onClick={handleSaveJournal}>
              Save Entry
            </button>
          </div>

          {/* 🌞 Daily Motivation */}
          <div className="service-card">
            <div className="service-icon">🌞</div>
            <h3>Daily Motivation</h3>
            <p>{quote}</p>
            <button
              className="refresh-btn"
              onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}
            >
              🔄 New Quote
            </button>
          </div>

          {/* 😴 Sleep Sounds */}
          <div className="service-card">
            <div className="service-icon">😴</div>
            <h3>Sleep Sounds</h3>
            <p>Listen to calming nature sounds and music for better sleep.</p>
            <audio controls>
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        {/* 📓 Show Journal Entries Below All Cards */}
        <div className="journal-entries">
          <h2>Your Thoughts</h2>
          {entries.length === 0 ? (
            <p>No thoughts saved yet...</p>
          ) : (
            entries.map((entry, idx) => (
              <div key={idx} className="entry-card">
                <p>{entry.entry}</p>
                <small>{new Date(entry.created_at).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
