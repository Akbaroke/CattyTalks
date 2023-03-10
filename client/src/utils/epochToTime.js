// function epochToTime(epoch) {
//   const date = new Date(parseInt(epoch))
//   const hours = date.getHours().toString().padStart(2, '0')
//   const minutes = date
//     .getMinutes()
//     .toString()
//     .padStart(2, '0')
//   return `${hours}:${minutes}`
// }

function epochToTime(epochTime) {
  const today = new Date()
  const date = new Date(parseInt(epochTime))
  const diffTime = Math.abs(today - date)
  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  )
  const formattedDate = date.toLocaleDateString()
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    timeZone:
      Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  let result
  if (diffDays === 0) {
    result = 'today, ' + formattedTime
  } else if (diffDays === 1) {
    result = 'yesterday, ' + formattedTime
  } else {
    result = formattedDate + ', ' + formattedTime
  }

  return result
}

export default epochToTime
