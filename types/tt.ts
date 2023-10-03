export type tinyThought = {
  id: string
  content: {
    html: string,
    markdown: string
  },
  createdAt: string
}

export type tinyThoughtData = {
  tinyThought: tinyThought
}

export type tinyThoughtsConnection = {
  aggregate: {
    count: number
  }
};

export type tinyThoughtsData = {
  tinyThoughts: tinyThought[]
  tinyThoughtsConnection: tinyThoughtsConnection
}

export type UpdateResponseType = {
  updateTinyThought: tinyThought;
};

export type PublishResponseType = {
  publishTinyThought: tinyThought;
};

export type CreateResponseType = {
  createTinyThought: tinyThought;
};

export type DeleteResponseType = {
  deleteTinyThought: tinyThought;
};