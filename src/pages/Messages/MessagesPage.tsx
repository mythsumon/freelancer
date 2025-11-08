import { useEffect, useMemo, useState } from "react";
import "./MessagesPage.css";

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "online" | "offline";
  avatar: string;
};

type Message = {
  id: string;
  author: "me" | "them";
  type: "text" | "image" | "file";
  content: string;
  timestamp: string;
  read?: boolean;
  reactions?: string[];
};

const chatListData: Chat[] = [
  {
    id: "chat-ava",
    name: "Ava Kim",
    lastMessage: "Got the files. Looks great!",
    time: "2:34 PM",
    unread: 0,
    status: "online",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "chat-john",
    name: "John D.",
    lastMessage: "Can we revise the color scheme?",
    time: "10:22 AM",
    unread: 2,
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "chat-sofia",
    name: "Sofia R.",
    lastMessage: "Sending the updated copy now",
    time: "Yesterday",
    unread: 1,
    status: "online",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "chat-leo",
    name: "Leo Park",
    lastMessage: "Thank you! Will review tonight.",
    time: "Mon",
    unread: 0,
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "chat-maya",
    name: "Maya L.",
    lastMessage: "Let’s jump on a call tomorrow?",
    time: "Sun",
    unread: 0,
    status: "online",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

const conversationMessages: Message[] = [
  {
    id: "m1",
    author: "them",
    type: "text",
    content: "Hey Ava, are you available for a logo update?",
    timestamp: "2:28 PM",
  },
  {
    id: "m2",
    author: "me",
    type: "text",
    content: "Hi John! Yes, I can deliver by tomorrow. Sending quote shortly.",
    timestamp: "2:29 PM",
    read: true,
    reactions: ["👍"],
  },
  {
    id: "m3",
    author: "them",
    type: "text",
    content: "Perfect. Thank you!",
    timestamp: "2:30 PM",
  },
  {
    id: "m4",
    author: "them",
    type: "image",
    content: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
    timestamp: "2:31 PM",
  },
  {
    id: "m5",
    author: "me",
    type: "file",
    content: "Brand-refresh-proposal.pdf",
    timestamp: "2:33 PM",
    read: false,
  },
  {
    id: "m6",
    author: "them",
    type: "text",
    content: "Got the files. Looks great!",
    timestamp: "2:34 PM",
  },
];

export const MessagesPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(chatListData[0]?.id ?? null);
  const [chatList, setChatList] = useState(chatListData);
  const [search, setSearch] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!selectedChatId) return;
    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              unread: 0,
            }
          : chat
      )
    );
  }, [selectedChatId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsTyping(false), 3600);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredChats = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return chatList;
    return chatList.filter((chat) => chat.name.toLowerCase().includes(value) || chat.lastMessage.toLowerCase().includes(value));
  }, [chatList, search]);

  const activeChat = useMemo(() => chatList.find((chat) => chat.id === selectedChatId) ?? chatList[0] ?? null, [chatList, selectedChatId]);

  const showConversation = !!activeChat && (!isMobile || (isMobile && selectedChatId));
  const showList = !isMobile || !selectedChatId;

  return (
    <div className={`messages-page ${isMobile ? "messages-page--mobile" : ""}`}>
      <div className="messages-shell">
        {showList && (
          <aside className="chat-list" aria-label="Chat list">
            <div className="chat-list__header">
              <h1>Messages</h1>
              <div className="search-input">
                <span aria-hidden="true">🔍</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search chats"
                  aria-label="Search chats"
                />
              </div>
            </div>
            <div className="chat-list__body" role="list">
              {filteredChats.length === 0 && (
                <div className="chat-empty">
                  <span role="img" aria-label="Inbox">📭</span>
                  <p>No messages yet</p>
                  <button type="button">Start new chat</button>
                </div>
              )}
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  role="listitem"
                  className={`chat-item ${selectedChatId === chat.id ? "chat-item--active" : ""}`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <div className="chat-item__avatar" aria-hidden="true">
                    <img src={chat.avatar} alt={chat.name} />
                    {chat.status === "online" && <span className="chat-item__status" />}
                  </div>
                  <div className="chat-item__meta">
                    <div className="chat-item__row">
                      <span className="chat-item__name">{chat.name}</span>
                      <span className="chat-item__time">{chat.time}</span>
                    </div>
                    <span className="chat-item__snippet">{chat.lastMessage}</span>
                  </div>
                  {chat.unread > 0 && <span className="chat-item__unread" aria-label={`${chat.unread} unread messages`}>{chat.unread}</span>}
                </button>
              ))}
            </div>
          </aside>
        )}

        {showConversation ? (
          <section className="chat-panel" aria-label="Conversation">
            <header className="chat-header">
              {isMobile && (
                <button className="chat-header__back" aria-label="Back to chat list" onClick={() => setSelectedChatId(null)}>
                  ←
                </button>
              )}
              <div className="chat-header__main">
                <div className="chat-header__avatar" aria-hidden="true">
                  <img src={activeChat?.avatar} alt={activeChat?.name ?? ""} />
                </div>
                <div>
                  <h2>{activeChat?.name ?? ""}</h2>
                  <span className="chat-header__status">● {activeChat?.status === "online" ? "Online" : "Offline"}</span>
                </div>
              </div>
              <div className="chat-header__actions" role="group" aria-label="Conversation actions">
                <button type="button" aria-label="Attach files">📎</button>
                <button type="button" aria-label="Star conversation">⭐</button>
                <button type="button" aria-label="More options" onClick={() => setInfoOpen((prev) => !prev)}>⋮</button>
              </div>
            </header>

            <div className="chat-body" role="log" aria-live="polite">
              <div className="chat-banner chat-banner--info">You’re online. Messages sync instantly.</div>
              <div className="chat-date">Today</div>
              {conversationMessages.map((message) => (
                <div key={message.id} className={`message ${message.author === "me" ? "message--sent" : "message--received"}`}>
                  <div className="message__bubble">
                    {message.type === "text" && <p>{message.content}</p>}
                    {message.type === "image" && (
                      <button type="button" className="message__image" onClick={() => setPreviewImage(message.content)} aria-label="Open image preview">
                        <img src={message.content} alt="Shared asset" loading="lazy" />
                      </button>
                    )}
                    {message.type === "file" && (
                      <button type="button" className="message__file">
                        <span aria-hidden="true">📄</span>
                        {message.content}
                      </button>
                    )}
                    {message.reactions && (
                      <div className="message__reactions" aria-hidden="true">
                        {message.reactions.map((reaction, index) => (
                          <span key={`${message.id}-reaction-${index}`}>{reaction}</span>
                        ))}
                      </div>
                    )}
                    <div className="message__actions" aria-hidden="true">
                      <button type="button">❤️</button>
                      <button type="button">👍</button>
                      <button type="button">😂</button>
                    </div>
                  </div>
                  <div className="message__meta">
                    <span>{message.timestamp}</span>
                    {message.author === "me" && message.read && <span aria-label="Read">✓✓</span>}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator" aria-label="John is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <form className="chat-composer" aria-label="Message composer">
              <button type="button" aria-label="Attach file">📎</button>
              <textarea
                placeholder="Type a message"
                rows={1}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    // handle send
                  }
                }}
              />
              <button type="submit" aria-label="Send message">➤</button>
            </form>
          </section>
        ) : (
          <section className="chat-empty-panel">
            <div>
              <span role="img" aria-label="Select chat">💬</span>
              <h2>Select a chat</h2>
              <p>Choose a conversation to start messaging.</p>
            </div>
          </section>
        )}

        <aside className={`chat-info ${infoOpen ? "chat-info--open" : ""}`} aria-label="Conversation details">
          <header>
            <h3>Conversation info</h3>
            <button type="button" aria-label="Close info" onClick={() => setInfoOpen(false)}>
              ✕
            </button>
          </header>
          {activeChat ? (
            <div className="chat-info__body">
              <div className="chat-info__profile">
                <img src={activeChat.avatar} alt={activeChat.name} />
                <h4>{activeChat.name}</h4>
                <span>{activeChat.status === "online" ? "Online" : "Offline"}</span>
              </div>
              <div className="chat-info__section">
                <h5>Active services</h5>
                <ul>
                  <li>Logo refresh · Due Sept 24</li>
                  <li>Brand guidelines · Completed</li>
                </ul>
              </div>
              <div className="chat-info__section">
                <h5>Files shared</h5>
                <ul>
                  <li>Brand-refresh-proposal.pdf</li>
                  <li>Palette-options.png</li>
                </ul>
              </div>
              <div className="chat-info__section">
                <label>
                  <input type="checkbox" defaultChecked />
                  Starred conversation
                </label>
              </div>
            </div>
          ) : (
            <p className="chat-info__empty">Select a chat to view details.</p>
          )}
        </aside>
      </div>

      {previewImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setPreviewImage(null)}>
          <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox__close" aria-label="Close" onClick={() => setPreviewImage(null)}>
              ✕
            </button>
            <img src={previewImage} alt="Shared attachment" />
          </div>
        </div>
      )}
    </div>
  );
};
