// // import { useState, useRef, useEffect } from "react";
// // import "./Chatbot.css";

// // export default function Chatbot({ onClose }) {
// //   const [messages, setMessages] = useState([
// //     { sender: "bot", text: "Hi, I’m MentalCare. How are you feeling today?" }
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const chatBodyRef = useRef(null);

// //   // Auto-scroll to the latest message
// //   useEffect(() => {
// //     if (chatBodyRef.current) {
// //       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const handleSend = async () => {
// //     const trimmedInput = input.trim();
// //     if (!trimmedInput || loading) return;

// //     const userMsg = { sender: "user", text: trimmedInput };
// //     setMessages((prev) => [...prev, userMsg]);
// //     setInput("");
// //     setLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append("text", trimmedInput);
// //       formData.append("mode", "openai"); // or "groq"

// //       const res = await fetch("http://localhost:5000/api/chatbot/process", {
// //         method: "POST",
// //         body: formData,
// //         // credentials: "include",
// //       });

// //       const data = await res.json();
// //       const botReply = data.reply || "Sorry, I couldn’t understand that.";
// //       setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
// //     } catch (err) {
// //       console.error("Chatbot error:", err);
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "bot", text: "⚠️ Connection error." }
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="chatbot-container">
// //       <div className="chatbot-header">
// //         MentalCare • Chat
// //         <span
// //           style={{ float: "right", cursor: "pointer" }}
// //           onClick={onClose}
// //         >
// //           ✖
// //         </span>
// //       </div>

// //       <div className="chatbot-body" ref={chatBodyRef}>
// //         {messages.map((msg, idx) => (
// //           <div key={idx} className={`chatbot-msg ${msg.sender}`}>
// //             {msg.text}
// //           </div>
// //         ))}
// //         {loading && <div className="chatbot-msg bot">Typing...</div>}
// //       </div>

// //       <div className="chatbot-input-area">
// //         <input
// //           type="text"
// //           placeholder="Type your message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //           disabled={loading}
// //         />
// //         <button onClick={handleSend} disabled={loading || !input.trim()}>
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect, useRef } from "react";
// import "./Chatbot.css";

// export default function ChatApp({ onClose }) {
//   const [chats, setChats] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatBodyRef = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;
//     (async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/chatbot/chats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error(`Chats failed: ${res.status}`);
//         const data = await res.json();
//         setChats(Array.isArray(data) ? data : []);
//         if (Array.isArray(data) && data.length > 0) {
//           setActiveChat(data[0]._id);
//           setMessages(data[0].messages || []);
//         } else {
//           setActiveChat(null);
//           setMessages([]);
//         }
//       } catch (err) {
//         console.error(err);
//         setChats([]);
//       }
//     })();
//   }, [token]);

//   useEffect(() => {
//     if (chatBodyRef.current) {
//       chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     const trimmedInput = input.trim();
//     if (!trimmedInput || loading) return;

//     const pendingUserMsg = { sender: "user", text: trimmedInput };
//     setMessages((prev) => [...prev, pendingUserMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chatbot/process", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         // If activeChat is null, backend will auto-create a new chat
//         body: JSON.stringify({ chatId: activeChat, text: trimmedInput }),
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         throw new Error(errData.error || `Process failed: ${res.status}`);
//       }

//       const updatedChat = await res.json();

//       // Update sidebar list
//       setChats((prev) => {
//         const others = prev.filter((c) => c._id !== updatedChat._id);
//         return [updatedChat, ...others]; // move updated chat to top
//       });

//       // Set active chat if it was created now
//       if (!activeChat) {
//         setActiveChat(updatedChat._id);
//       }

//       // Replace messages with server-truth
//       setMessages(updatedChat.messages || []);
//     } catch (err) {
//       console.error("Chatbot error:", err);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error: No reply." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewChat = async () => {
//     if (!token) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/chatbot/new", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`New chat failed: ${res.status}`);
//       const newChat = await res.json();
//       setChats((prev) => [newChat, ...prev]);
//       setActiveChat(newChat._id);
//       setMessages([]);
//     } catch (err) {
//       console.error("Error creating new chat:", err);
//     }
//   };

//   return (
//     <div className="chat-popup">
//       <div className="chatgpt-layout">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <button className="new-chat-btn" onClick={handleNewChat}>
//             ➕ New Chat
//           </button>

//           <div className="chat-list">
//             {chats.map((chat) => (
//               <div
//                 key={chat._id}
//                 className={`chat-item ${chat._id === activeChat ? "active" : ""}`}
//                 onClick={() => {
//                   setActiveChat(chat._id);
//                   setMessages(chat.messages || []);
//                 }}
//               >
//                 {chat.title || "Untitled Chat"}
//               </div>
//             ))}
//           </div>

//           <div className="sidebar-footer">
//             <button>⚙ Settings</button>
//           </div>
//         </div>

//         {/* Chat window */}
//         <div className="chat-window">
//           <div className="chatbot-header">
//             MentalCare • Chat
//             <span style={{ float: "right", cursor: "pointer" }} onClick={onClose}>
//               ✖
//             </span>
//           </div>

//           <div className="chatbot-body" ref={chatBodyRef}>
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`chatbot-msg ${msg.sender}`}>
//                 {msg.text}
//               </div>
//             ))}
//             {loading && <div className="chatbot-msg bot">Typing...</div>}
//           </div>

//           <div className="chatbot-input-area">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               disabled={loading}
//             />
//             <button onClick={handleSend} disabled={loading || !input.trim()}>
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

export default function Chatbot({ onClose }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState(
    localStorage.getItem("voice_lang") || "auto"
  );
  const chatBodyRef = useRef(null);
  const recognitionRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false; // listen per sentence
      recognition.interimResults = false; // only final results
      
      // We'll set recognition.lang right before starting based on selector

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // If Auto, infer and persist user language from transcript
        if (voiceLang === "auto") {
          const hasDevanagari = /[\u0900-\u097F]/.test(transcript);
          if (hasDevanagari) {
            // Distinguish hi vs mr with a few Marathi-specific chars
            const mrSpecific = /[ळऱॅय़ॲॐ]/;
            localStorage.setItem("user_language", mrSpecific.test(transcript) ? "mr" : "hi");
          } else {
            localStorage.setItem("user_language", "en");
          }
        }
        setInput(transcript); // put text in input box
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition API not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in your browser.");
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      // Resolve recognition language based on selector
      const userLang = localStorage.getItem("user_language") || "en";
      const map = { en: "en-US", hi: "hi-IN", mr: "mr-IN" };
      let langToUse = "en-US";
      if (voiceLang === "auto") {
        langToUse = map[userLang] || "en-US";
      } else if (voiceLang === "en") langToUse = "en-US";
      else if (voiceLang === "hi") langToUse = "hi-IN";
      else if (voiceLang === "mr") langToUse = "mr-IN";
      recognitionRef.current.lang = langToUse;

      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Please log in to use the chat." },
      ]);
      return;
    }
    
    // Store user language for voice recognition
    if (trimmedInput && !localStorage.getItem("user_language")) {
      // Simple language detection for first message
      if (/[\u0900-\u097F]/.test(trimmedInput)) {
        if (/[\u0900-\u091F]/.test(trimmedInput)) {
          localStorage.setItem("user_language", "hi");
        } else {
          localStorage.setItem("user_language", "mr");
        }
      } else {
        localStorage.setItem("user_language", "en");
      }
    }

    const pendingUserMsg = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, pendingUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch("http://localhost:5000/api/chatbot/process", {
        method: "POST",
        headers,
        body: JSON.stringify({ chatId: activeChat, text: trimmedInput }),
      });

      const status = res.status;
      const raw = await res.text();
      let parsed;
      try {
        parsed = raw ? JSON.parse(raw) : {};
      } catch (_) {
        parsed = null;
      }

      if (!res.ok) {
        const message = (parsed && (parsed.error || parsed.message)) || raw || `Request failed: ${status}`;
        if (status === 401) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "Unauthorized. Please log in again." },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: `Backend error (${status}): ${message}` },
          ]);
        }
        console.error("/api/chatbot/process failed", { status, message, raw });
        throw new Error(message);
      }

      const updatedChat = parsed;

      setChats((prev) => {
        const others = prev.filter((c) => c._id !== updatedChat._id);
        return [updatedChat, ...others];
      });

      if (!activeChat) {
        setActiveChat(updatedChat._id);
      }

      setMessages(updatedChat.messages || []);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: No reply." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-popup">
      <div className="chatgpt-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <button className="new-chat-btn" onClick={() => window.location.reload()}>
            ➕ New Chat
          </button>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${chat._id === activeChat ? "active" : ""}`}
                onClick={() => {
                  setActiveChat(chat._id);
                  setMessages(chat.messages || []);
                }}
              >
                {chat.title || "Untitled Chat"}
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="chat-window">
          <div className="chatbot-header">
            MentalCare • Chat
            <span style={{ float: "right", cursor: "pointer" }} onClick={onClose}>
              ✖
            </span>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-msg bot">Typing...</div>}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <select
              value={voiceLang}
              onChange={(e) => {
                const v = e.target.value;
                setVoiceLang(v);
                localStorage.setItem("voice_lang", v);
              }}
              style={{ marginRight: 8 }}
            >
              <option value="auto">Auto</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
            <button onClick={handleMicClick}>
              {listening ? "🎤 Stop" : "🎙 Speak"}
            </button>
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
