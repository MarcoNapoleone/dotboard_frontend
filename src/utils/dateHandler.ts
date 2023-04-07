export const getFormattedDate = (date: Date | string | number) => {
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
    "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
  ];
  if (date === null) return null;
  let dt = new Date(date)
  return (`${("0" + dt.getDate()).slice(-2)} ${monthNames[dt.getMonth()]} ${("000" + dt.getFullYear()).slice(-4)}`)
};

export const getFormattedTime = (date: Date | string | number) => {
  let dt = new Date(date)
  return (`${('0' + dt.getHours()).slice(-2)}:${('0' + dt.getMinutes()).slice(-2)}`);
};

export const getFormattedMonth = (date: Date | string | number) => {
  const monthNames = ["Gennaio", "Febraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  let dt = new Date(date)
  return (`${monthNames[dt.getMonth()]}`)
};


export const getUpdatedTime = () => {
  let dt = new Date()
  return (("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2))
}