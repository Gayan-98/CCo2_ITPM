import React, { useState, useEffect } from 'react';
import { db, storage } from "../../lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./chat.css";
const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    const messagesCollection = collection(db, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() || imageUpload) {
      try {
        let imageUrl = '';
        if (imageUpload) {
          const imageRef = ref(storage, `images/${imageUpload.name}`);
          await uploadBytes(imageRef, imageUpload);
          imageUrl = await getDownloadURL(imageRef);
        }

        const messagesCollection = collection(db, 'messages');
        await addDoc(messagesCollection, {
          text: newMessage,
          imageUrl: imageUrl,
          createdAt: new Date(),
        });
        setNewMessage('');
        setImageUpload(null);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message-item">
            <div className="message-header">
              <strong>{message.createdAt.toDate().toLocaleString()}</strong>
            </div>
            <div className="message-body">
              <p>{message.text}</p>
              {message.imageUrl && (
                <img src={message.imageUrl} alt="Uploaded" className="message-image" />
              )}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-row">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
            className="image-upload"
          />
        </div>
        <div className="button-row">
          <button type="submit" className="send-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;