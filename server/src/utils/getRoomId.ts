export function getRoomId() {
  const roomId = crypto.randomUUID().slice(0, 8);

  return roomId;
}
