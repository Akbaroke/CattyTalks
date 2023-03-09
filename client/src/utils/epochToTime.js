function epochToTime(epoch) {
  const date = new Date(parseInt(epoch))
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  return `${hours}:${minutes}`
}

export default epochToTime
