export type tinyThought = {
  id: string;
  content: {
    html: string;
    markdown: string;
  };
  createdAt: string;
};

export type tinyThoughtData = {
  tinyThought: tinyThought;
};

export type tinyThoughtsConnection = {
  aggregate: {
    count: number;
  };
};

export type tinyThoughtsData = {
  tinyThoughts: tinyThought[];
  tinyThoughtsConnection: tinyThoughtsConnection;
};

export type UpdateResponseType = {
  data: tinyThought;
};

export type PublishResponseType = {
  data: tinyThought;
};

export type CreateResponseType = {
  data: tinyThought;
};

export type DeleteResponseType = {
  data: tinyThought;
};

export type getAllResponseType = {
  data: tinyThoughtsData;
};
