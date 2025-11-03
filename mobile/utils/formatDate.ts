export const formatDate = (dateString: string) => {
  const localDate = new Date(dateString);
  return localDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
