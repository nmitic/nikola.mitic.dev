export type tinyThought = {
  content: {
    markdown: string
  },
  createdAt: string
}

export type tinyThoughtData = {
  tinyThought: tinyThought
}

export type tinyThoughtsData = {
  tinyThoughts: tinyThought[]
}
