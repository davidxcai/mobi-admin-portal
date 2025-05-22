export function formattedDate() {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatWeekDay(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
}