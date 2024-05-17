const getFakeReader = () =>
  new ReadableStream({
    async start(controller) {
      for (const chunk of "Hello this is demo response and it is static and totally fake".split(
        ""
      )) {
        // Simulate delay for each chunk
        await new Promise((resolve) => setTimeout(resolve, 20));
        controller.enqueue(new TextEncoder().encode(chunk));
      }
      controller.close();
    },
  }).getReader();

const getStreamReader = async (fake: boolean, question: string) => {
  if (fake) {
    return getFakeReader();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/ask?question=${question}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Check if the Response object has a ReadableStream as its body
  if (!response.body || !response.body.getReader) {
    console.error("Streaming not supported in this environment.");
    return;
  }
  return response.body.getReader();
};

export const answerQuestionWithStream = async ({
  onStreamStart,
  onStream,
  onStreamDone,
  onError,
  question,
}: {
  onStreamStart: () => void;
  onStream: (chunk: string) => void;
  onStreamDone: (answer: string) => void;
  onError: () => void;
  question: string;
}) => {
  try {
    const demo = process.env.NEXT_PUBLIC_AI_DEMO === "true";

    const reader = await getStreamReader(demo, question);

    if (!reader) {
      console.error("Stream reader undefined");

      return;
    }

    const textDecoder = new TextDecoder();

    onStreamStart();

    // Keeps track of streamed answer and will evaluate to full once streaming is done
    let fullDecodedAnswer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedText = textDecoder.decode(value);

      fullDecodedAnswer = fullDecodedAnswer + decodedText;
      onStream(decodedText);
    }
    onStreamDone(fullDecodedAnswer);
  } catch (error) {
    console.error(error);
    // indicated to the user the error has happen
    onError();
  }
};
