type Model = {
  createdAt: string
}

export const sortByCreatedAt = (a: Model, b: Model) => {
  const aDate = new Date(a.createdAt).getTime()
  const bDate = new Date(b.createdAt).getTime()

  return bDate - aDate
}
