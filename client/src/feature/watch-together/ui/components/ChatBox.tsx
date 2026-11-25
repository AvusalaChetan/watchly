import {useEffect, type JSX} from "react";
import {useSocket} from "../../hooks/useSocket";
import Button from "../../../../shared/ui/components/Button";

const ChatBox = (): JSX.Element => {
  const {socket} = useSocket();

  useEffect(() => {
    socket?.emit("message", "hiii");
  }, [socket]);

  return (
    <>
      <aside
        aria-label="Chat"
        className="flex min-h-80 flex-col overflow-hidden rounded-xl border border-(--border) bg-(--surface) lg:min-h-0"
      >
        <div className="border-b border-(--border) px-4 py-3 flex items-center  justify-between ">
          <h2 className="font-semibold text-(--foreground)">Live chat</h2>
          <div className="flex gap-4">
            <Button className="rounded-xs"
            
            >Watch-Together</Button>
            <Button className="bg-green-500 capitalize rounded-sm ">
              join
            </Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-center text-sm text-(--muted)">
          Chat will appear here
        </div>
        
      </aside>
    </>
  );
};

export default ChatBox;
