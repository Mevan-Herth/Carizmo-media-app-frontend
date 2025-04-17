import { useState } from 'react';
import { chatBotQuery } from '../services/api';
const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('')

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    
    setAnswer(chatBotQuery(message))
    console.log('Message sent:', message);
    setMessage('');
    //setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all"
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat overlay */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-500 text-white p-3">
            <h1 className="font-semibold">Carizmo-bot</h1>
            <p>Carizmo Azziztant</p>
          </div>
          
          {message == ''&&(
          <div className="p-4 max-h-60 overflow-y-auto">
            <div className="mb-4 text-sm text-gray-600">
              Ask anything.
            </div>
          </div>
          )}
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                placeholder="Type your message..."
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;