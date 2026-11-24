import {type JSX} from "react";

const ChatBox = (): JSX.Element => {
  return (
    <>
      <aside
        aria-label="Chat"
        className="flex min-h-80 flex-col overflow-hidden rounded-xl border border-(--border) bg-(--surface) lg:min-h-0"
      >
        <div className="border-b border-(--border) px-4 py-3">
          <h2 className="font-semibold text-(--foreground)">Live chat</h2>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-center text-sm text-(--muted)">
          Chat will appear here
        </div>
      </aside>
    </>
  );
};

export default ChatBox;
