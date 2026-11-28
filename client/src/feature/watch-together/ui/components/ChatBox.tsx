import {useEffect, useState, type JSX} from "react";
import Button from "../../../../shared/ui/components/Button";
import {useSocket} from "../../hooks/useSocket";

const ChatBox = (): JSX.Element => {
  const {socket, roomId, setRoomId} = useSocket();
  const [copied, setCopied] = useState(false);
  const [join, setJoin] = useState(false);
  const handileCreateRoom = () => {
    socket?.emit("room:create");
  };

  useEffect(() => {
    socket?.on("room:created", ({roomId}) => {
      setRoomId(roomId);
      console.log(roomId);
    });
  }, [socket, setRoomId]);

  const handleCopy = async () => {
    if (!roomId) return;
    await navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <>
      <aside
        aria-label="Chat"
        className="flex min-h-80 flex-col overflow-hidden rounded-xl border border-(--border) bg-(--surface) lg:min-h-0"
      >
        <div className="border-b border-(--border) px-4 py-3 flex items-center  justify-between ">
          {roomId && (
            <h2 className="font-semibold text-(--foreground)">Live chat</h2>
          )}
          <div className="flex gap-4">
            <Button className="rounded-xs" onClick={handileCreateRoom}>
              Watch-Together
            </Button>
            {!roomId && (
              <Button
                className="bg-green-500 capitalize rounded-sm "
                onClick={() => setJoin(true)}
              >
                join
              </Button>
            )}
          </div>
        </div>
        <div>
          <div>
            {roomId && (
              <div style={{display: "flex", alignItems: "center", gap: 8}}>
                <span>{roomId}</span>
                <button onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
          <div>
            {join && (
              <div className="w-full h-full flex items-center justify-center gap-1">
                <input
                  type="text"
                  className="border"
                  placeholder="enter join code"
                />
                <Button> send join request</Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatBox;
