export function formatDate(inputDateString) {
  const dateObj = new Date(inputDateString);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
}

export function getEmailAddress(customer_name) {
  const firstName = customer_name.split(' ')[0].toLowerCase();
  return `${firstName}@gmail.com`;
}