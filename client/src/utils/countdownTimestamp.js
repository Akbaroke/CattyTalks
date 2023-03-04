export const countdownTime = (epoch_time = 0, now) => {
  const date = new Date(epoch_time);
  const diff = now - date;

  const diff_seconds = diff / 1000;
  const diff_minutes = diff / 1000 / 60;
  const diff_hours = diff / 1000 / 60 / 60;
  const diff_days = diff / 1000 / 60 / 60 / 24;
  const diff_weeks = diff / 1000 / 60 / 60 / 24 / 7;

  if (diff_seconds < 60) {
    return Math.floor(diff_seconds) + ' seconds ago';
  } else if (diff_minutes < 60) {
    return Math.floor(diff_minutes) + ' minutes ago';
  } else if (diff_hours < 24) {
    return Math.floor(diff_hours) + ' hours ago';
  } else if (diff_days < 7) {
    return Math.floor(diff_days) + ' days ago';
  } else if (diff_weeks < 52) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } else {
    return `${date.toLocaleDateString()}`;
  }
};
