const randomDirection = () => {
  const r = Math.round(random(0, 10))
  return r % 2 ? 1 : -1
}
