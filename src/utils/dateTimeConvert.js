exports.toIso = (dateTime) => {
  const date = new Date(dateTime);
  return date.toISOString();
};

exports.toDateTime = (iso) => {
  const dateIso = new Date(iso);
  return dateIso.toLocaleString("en-US");
};
