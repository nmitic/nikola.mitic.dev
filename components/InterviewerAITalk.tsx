"use client";

import { useEffect, useState } from "react";

const QuestionTranscript = ({
  onEnd,
  onStart,
  listening,
}: {
  onEnd: (question: string) => void;
  onStart: () => void;
  listening: boolean;
}) => {
  const [finalTranscripts, setFinalTranscripts] = useState("");
  const [interimTranscripts, setInterimTranscripts] = useState("");

  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.lang = "en-US";
    recognition.interimResults = true;

    let finalTranscriptsTemp = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscriptsTemp = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptsTemp += transcript;
        } else {
          interimTranscriptsTemp += transcript;
        }
      }
      setFinalTranscripts(finalTranscriptsTemp);
      setInterimTranscripts(interimTranscriptsTemp);
    };

    recognition.onend = (_event: Event) => {
      onEnd(finalTranscriptsTemp);
    };

    recognition.onstart = () => {
      onStart();
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [listening]);

  return (
    <p className="text-3xl m-auto max-w-[680px]">
      {finalTranscripts ? finalTranscripts + "?" : null}
      <span className=" text-gray-400">{interimTranscripts}</span>
    </p>
  );
};

const fetchAudioAnswerStream = async (question: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AI_INTERVIEWER_SERVICE}/api/talk?question=${question}&demo=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the Response object has a ReadableStream as its body
    if (!response.body || !response.body.getReader) {
      console.error("Streaming not supported in this environment.");
      return;
    }

    const reader = response.body.getReader();

    const readerResults = await reader.read();
    const readerResultsValue = readerResults.value;

    return readerResultsValue;
  } catch (error) {
    console.error("AudioAnswer", error);
  }
};

const audioPlayer = async (
  question: string
): Promise<HTMLAudioElement | undefined> => {
  try {
    const audioAnswerStream = await fetchAudioAnswerStream(question);
    const blob = new Blob([audioAnswerStream as BlobPart], {
      type: "audio/mp3",
    });
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = url;
    return audio;
  } catch (error) {
    console.error("playAnswer", error);
  }
};

const playAudio = async ({
  onAudioEnded,
  onAnswerStart,
  question,
}: {
  onAudioEnded: () => void;
  onAnswerStart: () => void;
  question: string;
}) => {
  const audio = await audioPlayer(question);
  if (audio) {
    audio?.play();
    audio.addEventListener("playing", () => {
      onAnswerStart();
    });
    audio.addEventListener("ended", () => {
      onAudioEnded();
      console.log("DONE");
    });
  }
};

const AudioAnswer = ({
  question,
  onAnswerDone,
  onAnswerStart,
  thinking,
}: {
  question: string;
  onAnswerDone: () => void;
  onAnswerStart: () => void;
  thinking: boolean;
}) => {
  useEffect(() => {
    console.log("running audio effect");
    if (thinking) {
      playAudio({
        onAudioEnded: onAnswerDone,
        onAnswerStart: onAnswerStart,
        question,
      });
    }
  }, [thinking]);

  return null;
};

enum TalkStatusEnum {
  notListening = "not-listening",
  listening = "listening",
  thinking = "thinking",
  talking = "talking",
}

const getStatusMSG = (status: TalkStatusEnum) => {
  switch (status) {
    case TalkStatusEnum.notListening:
      return "Click here to start talking";
    case TalkStatusEnum.listening:
      return "I am listening";
    case TalkStatusEnum.thinking:
      return "I am thinking, be patient";
    case TalkStatusEnum.talking:
      return "I am talking you better be listening";
    default:
      break;
  }
};

const TalkStatus = ({
  status,
  onClick,
}: {
  status: TalkStatusEnum;
  onClick: () => void;
}) => {
  return (
    <div className=" cursor-pointer" onClick={() => onClick()}>
      {getStatusMSG(status)}
    </div>
  );
};

export const InterviewerAITalk = () => {
  const [question, setQuestion] = useState("");
  const [talkStatus, setTalkStatus] = useState<TalkStatusEnum>(
    TalkStatusEnum.notListening
  );

  const listening = talkStatus === TalkStatusEnum.listening;
  const thinking = talkStatus === TalkStatusEnum.thinking;

  return (
    <>
      <TalkStatus
        status={talkStatus}
        onClick={() => {
          setTalkStatus(TalkStatusEnum.listening);
        }}
      />
      <div className="container max-w-3xl mx-auto mb-auto mt-auto">
        <AudioAnswer
          question={question}
          thinking={thinking}
          onAnswerDone={() => {
            setTalkStatus(TalkStatusEnum.listening);
            setQuestion("");
          }}
          onAnswerStart={() => {
            setTalkStatus(TalkStatusEnum.talking);
          }}
        />

        <QuestionTranscript
          onEnd={(question) => {
            if (!!question) {
              setQuestion(question);
              setTalkStatus(TalkStatusEnum.thinking);
            } else {
              setTalkStatus(TalkStatusEnum.notListening);
            }
          }}
          onStart={() => {
            setTalkStatus(TalkStatusEnum.listening);
          }}
          listening={listening}
        />
      </div>
    </>
  );
};
