import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice.js";
import ReactMarkdown from "react-markdown";
import { useChat } from "../hook/useChat.js";
import { useDispatch } from "react-redux";
import {
  ArrowUp,
  ChevronDown,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const dispatch = useDispatch();

  const {
    initSocket,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
  } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [input, setInput] = useState("");
  const activeChat = currentChatId;

  const firstName = user?.username?.split(" ")[0] || "there";
  const initials = (user?.username || "You").slice(0, 2).toUpperCase();
  const chatGroups = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const groups = {
      Today: [],
      "Previous 7 days": [],
      Older: [],
    };

    Object.values(chats)
      .sort(
        (firstChat, secondChat) =>
          new Date(secondChat.lastUpdated || 0) -
          new Date(firstChat.lastUpdated || 0),
      )
      .forEach((chat) => {
        const updatedAt = new Date(chat.lastUpdated);
        const label =
          updatedAt >= startOfToday
            ? "Today"
            : updatedAt >= startOfWeek
              ? "Previous 7 days"
              : "Older";

        groups[label].push({
          id: chat._id,
          title: chat.title,
          time: updatedAt.toLocaleDateString([], {
            month: "short",
            day: "numeric",
          }),
        });
      });

    return Object.entries(groups)
      .filter(([, groupChats]) => groupChats.length > 0)
      .map(([label, groupChats]) => ({ label, chats: groupChats }));
  }, [chats]);

  useEffect(() => {
    const socket = initSocket();
    handleGetChats();

    return () => socket.disconnect();
  }, [initSocket]);

  const startNewChat = () => {
    dispatch(setCurrentChatId(null));
    setInput("");
  };

  const submitMessage = (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content) return;

    handleSendMessage(content, currentChatId);
    setInput("");
  };

  return (
    <main className="chat-app min-h-screen bg-base-100 text-base-content">
      <div className="drawer lg:drawer-open">
        <input
          id="chat-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isSidebarOpen}
          onChange={(event) => setIsSidebarOpen(event.target.checked)}
        />
        <div className="drawer-content flex min-h-screen flex-col">
          <header className="flex h-16 items-center justify-between border-b border-base-300/70 px-5 lg:px-10">
            <div className="flex items-center gap-3">
              <label
                htmlFor="chat-drawer"
                aria-label="Toggle sidebar"
                className="btn btn-ghost btn-sm btn-square drawer-button lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </label>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                <span className="grid size-7 place-items-center rounded-lg bg-[#d97757] text-xs font-bold text-white">
                  P
                </span>
                <span>Perplexity</span>
              </div>
              <span className="hidden text-base-content/40 sm:inline">/</span>
              <span className="hidden text-sm text-base-content/60 sm:inline">
                Product notes
              </span>
            </div>
            <div className="relative">
              <button
                type="button"
                className="btn btn-ghost btn-sm gap-2 rounded-xl px-2"
                onClick={() => setIsProfileOpen((open) => !open)}
              >
                <span className="grid size-7 place-items-center rounded-full bg-[#263238] text-[10px] font-bold text-white">
                  {initials}
                </span>
                <span className="hidden max-w-24 truncate text-xs font-medium sm:inline">
                  {user?.username || "Your space"}
                </span>
                <ChevronDown
                  className="size-4 text-base-content/50"
                  aria-hidden="true"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 top-11 z-20 w-52 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
                  <div className="border-b border-base-200 px-3 py-2">
                    <p className="text-xs font-semibold">
                      {user?.username || "Your account"}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-base-content/50">
                      Personal workspace
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm mt-1 w-full justify-start text-xs"
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm w-full justify-start text-xs text-error"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </header>

          <section className="flex flex-1 flex-col px-5 pb-5 sm:px-8 lg:px-10">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              <div className="flex-1 py-12 sm:py-16">
                {chats[currentChatId]?.messages.length === 0 ? (
                  <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                    <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-[#f3e8e0] text-[#b45d3f]">
                      <Sparkles className="size-6" aria-hidden="true" />
                    </span>
                    <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      What&apos;s on your mind, {firstName}?
                    </h1>
                    <p className="mt-3 max-w-md text-sm leading-6 text-base-content/55">
                      Ask anything, work through an idea, or bring a half-formed
                      thought. We&apos;ll give it some shape.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-9">
                    {chats[currentChatId]?.messages.map((message, index) => (
                      <article
                        key={
                          message._id ||
                          message.id ||
                          `${message.role}-${index}`
                        }
                        className={
                          message.role === "user"
                            ? "ml-auto max-w-[88%]"
                            : "max-w-[92%]"
                        }
                      >
                        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-base-content/40">
                          <span
                            className={
                              message.role === "user"
                                ? "size-2 rounded-full bg-[#263238]"
                                : "size-2 rounded-full bg-[#d97757]"
                            }
                          />
                          {message.role === "user" ? "You" : "Assistant"}
                        </div>
                        <div
                          className={
                            message.role === "user"
                              ? "rounded-2xl rounded-tr-sm bg-[#263238] px-4 py-3 text-sm leading-6 text-white"
                              : "font-display text-[1.08rem] leading-8 text-base-content/85 [&_a]:text-[#b45d3f] [&_a]:underline [&_code]:rounded [&_code]:bg-base-200 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.9em] [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-3 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#111315] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-[#d97757] [&_blockquote]:pl-4 [&_strong]:font-bold [&_ul]:my-3"
                          }
                        >
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={submitMessage}
                className="sticky bottom-5 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-[0_12px_40px_rgba(38,50,56,0.10)]"
              >
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey)
                      submitMessage(event);
                  }}
                  rows="2"
                  placeholder="Message Perplexity..."
                  className="textarea textarea-ghost min-h-20 w-full resize-none border-0 px-3 pt-2 text-sm leading-6 outline-none focus:bg-transparent focus:outline-none"
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs rounded-lg text-base-content/50"
                      aria-label="Add attachment"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                    <span className="hidden text-[11px] text-base-content/40 sm:inline">
                      Shift + Enter for a new line
                    </span>
                  </div>
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="btn btn-sm min-h-9 rounded-xl border-0 bg-[#d97757] px-3 text-white hover:bg-[#bd6246]"
                  >
                    <ArrowUp className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
              <p className="mt-3 text-center text-[11px] text-base-content/40">
                Perplexity can make mistakes. Check important information.
              </p>
            </div>
          </section>
        </div>

        <aside className="drawer-side z-30">
          <label
            htmlFor="chat-drawer"
            aria-label="Close sidebar"
            className="drawer-overlay"
          />
          <div className="flex min-h-full w-72 flex-col border-r border-white/10 bg-[#111315] px-3 py-4">
            <div className="mb-7 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                <span className="grid size-7 place-items-center rounded-lg bg-[#d97757] text-xs text-white">
                  P
                </span>
                Perplexity
              </div>
              <label
                htmlFor="chat-drawer"
                className="btn btn-ghost btn-xs btn-square lg:hidden"
              >
                <X className="size-4" aria-hidden="true" />
              </label>
            </div>
            <button
              type="button"
              onClick={startNewChat}
              className="btn mb-5 h-10 min-h-10 justify-start gap-3 rounded-xl border-white/10 bg-[#1a1d20] px-3 text-xs font-semibold text-white shadow-sm hover:border-[#d97757]"
            >
              <Plus
                className="size-5 font-normal text-[#d97757]"
                aria-hidden="true"
              />{" "}
              New conversation
            </button>
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#24272a] p-1">
              <button
                type="button"
                className="btn btn-sm h-8 min-h-8 rounded-lg border-0 bg-[#111315] text-xs text-white shadow-sm"
              >
                Chats
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm h-8 min-h-8 rounded-lg text-xs text-base-content/50"
              >
                Projects
              </button>
            </div>
            <nav className="flex-1 space-y-6 overflow-y-auto">
              {chatGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/40">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group flex w-full items-center rounded-xl text-xs transition ${activeChat === chat.id ? "bg-[#2d2723] font-semibold text-white" : "text-white/65 hover:bg-[#1a1d20]"}`}
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenChat(chat.id)}
                          className="flex min-w-0 flex-1 items-center justify-between rounded-xl px-3 py-2.5 text-left"
                        >
                          <span className="truncate pr-2">{chat.title}</span>
                          <span className="shrink-0 text-[10px] text-base-content/35">
                            {chat.time}
                          </span>
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${chat.title}`}
                          title="Delete conversation"
                          onClick={() => {
                            if (window.confirm(`Delete "${chat.title}"?`)) {
                              handleDeleteChat(chat.id);
                            }
                          }}
                          className="mr-2 grid size-7 shrink-0 place-items-center rounded-lg text-base-content/40 opacity-0 transition hover:bg-error/15 hover:text-error group-hover:opacity-100"
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-5 border-t border-base-300/70 pt-4">
              <button
                type="button"
                className="btn btn-ghost btn-sm w-full justify-start gap-3 rounded-xl px-3 text-xs text-base-content/60"
              >
                <Search className="size-4" aria-hidden="true" /> Search
                conversations
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm w-full justify-start gap-3 rounded-xl px-3 text-xs text-base-content/60"
              >
                <Settings className="size-4" aria-hidden="true" /> Settings
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
