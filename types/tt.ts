export type tinyThought = {
  content: {
    markdown: string;
    raw: {
      children: [];
    };
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
