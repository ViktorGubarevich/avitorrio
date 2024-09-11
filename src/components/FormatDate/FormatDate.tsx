export const FormatDate = ({ createdAt }) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <h2>Дата заказа: {formattedDate}</h2>;
};
