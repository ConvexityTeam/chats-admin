export const formatNumbers = (number: number) => {
  if (number > 999 && number < 1000000) return (number / 1000).toFixed(1) + "K";

  if (number > 1000000 && number < 1000000000)
    return (number / 1000000).toFixed(1) + "M";

  if (number > 1000000000 && number < 1000000000000)
    return (number / 1000000000).toFixed(1) + "B";

  if (number > 1000000000000) return (number / 1000000000000).toFixed(1) + "T";

  if (number < 900) return number;
};

export const formatMoney = (number: number) => {
  return `₦ ${(Math.round(number * 100) / 100).toLocaleString()}`;
};

export const formatDate = (dateString: string) => {
  const date_string = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date_string.getFullYear();
  const month = months[date_string.getMonth()];
  const date: any = date_string.getDate();

  const formattedDate = `${date} ${month}, ${year}`;

  return formattedDate;
};
// export const formatDateAndTime = (dateString: string) => {
//   const date_string = new Date(dateString);

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const fullMonthsTexts = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const year = date_string.getFullYear();
//   const month = months[date_string.getMonth()];
//   const fullMonthsText = fullMonthsTexts[date_string.getMonth()];
//   let date: any = date_string.getDate();
//   let hours: any = date_string.getHours();
//   let minutes: any = date_string.getMinutes();
//   let seconds: any = date_string.getSeconds();

//   // am or pm format
//   const am_or_pm = hours >= 12 ? "pm" : "am";
//   // hours format
//   hours %= 12;
//   hours = hours || 12;

//   date = date <= 9 ? `0${date}` : date;
//   hours = hours <= 9 ? `0${hours}` : hours;
//   minutes = minutes <= 9 ? `0${minutes}` : minutes;
//   seconds = seconds <= 9 ? `0${seconds}` : seconds;

//   const formattedDate = `${month} ${date}, '${year.toString().slice(2)}`;
//   const formattedFullDate = `${fullMonthsText} ${date}, ${year}`;
//   const formattedTime = `${hours}:${minutes} ${am_or_pm}`;

//   return { formattedDate, formattedTime, formattedFullDate };
// };

export const snakeToCamelCase = (s) =>
  s.toLowerCase().replace(/(_\w)/g, (w) => w.toUpperCase().substr(1));
