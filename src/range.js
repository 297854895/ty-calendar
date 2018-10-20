const range = ({ start, end, random, endStr }, cb) => {
  const range = []
  if (cb && typeof cb === 'function') {
    for (let idx = start; idx < end; idx++) {
      range[range.length] = cb(idx)
    }
  } else {
    for (let idx = start; idx < end; idx++) {
      range[range.length] = random ? Math.random() : idx + (endStr ? endStr : 0)
    }
  }
  return range
}
export default range
