export const formatDate = (date: string | Date | undefined) => {
  if (!date) {
    return "No Date";
  }
  const dateStr = new Date(date);
  const day = dateStr.getDate();
  const month = dateStr.toLocaleString("default", { month: "short" });
  const year = dateStr.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatTime = (date: Date) => {
  const dateStr = new Date(date)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLowerCase();
  return `${dateStr}`;
};

export function isDifferentDay(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear()
  );
}
