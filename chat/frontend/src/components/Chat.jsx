import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import './Chat.css'

export default function Chat() {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chatRef = useRef(null)

  const fetchMessages = () => {
    fetch('/api/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  };

  useEffect(() => {
    fetchMessages();

    const id = setInterval(fetchMessages, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const container = chatRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    if (userMessage.trim()) {
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: userMessage })
      })
        .then(() => {
          fetchMessages()
          setUserMessage('');
        })
        .catch(error => console.error('Error sending message:', error));
    }

    setIsSubmitting(false)
  };

  return <>
    <div className="chat" ref={chatRef}>
      {messages.map(msg => (
        <MessageCard key={msg._id} message={msg} />
      ))}
    </div>

    <form onSubmit={handleSubmit}>
      <fieldset role="group">
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          disabled={isSubmitting}
        />
        <input type="submit" value="Send" disabled={isSubmitting || userMessage.length == 0} />
      </fieldset>
    </form>
  </>
}
