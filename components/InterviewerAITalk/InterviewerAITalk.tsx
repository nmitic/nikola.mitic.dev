"use client";

import { useState } from "react";
import { TalkStatusEnum, TalkStatus } from "./components/TalkStatus";
import { AudioAnswer } from "./components/AudioAnswer";
import { QuestionTranscript } from "./components/QuestionTranscript";

export const InterviewerAITalk = () => {
  const [question, setQuestion] = useState("");
  const [talkStatus, setTalkStatus] = useState<TalkStatusEnum>(
    TalkStatusEnum.notListening
  );

  const listening = talkStatus === TalkStatusEnum.listening;
  const thinking = talkStatus === TalkStatusEnum.thinking;
  const talking = talkStatus === TalkStatusEnum.talking;

  const shouldRenderAudioAnswer = thinking || talking;

  return (
    <>
      <TalkStatus
        status={talkStatus}
        onClick={() => {
          setTalkStatus(TalkStatusEnum.listening);
        }}
      />
      <div className="container max-w-3xl mx-auto mb-auto mt-auto">
        {shouldRenderAudioAnswer && (
          <AudioAnswer
            question={question}
            onAnswerDone={() => {
              setTalkStatus(TalkStatusEnum.listening);
              setQuestion("");
            }}
            onAnswerStart={() => {
              setTalkStatus(TalkStatusEnum.talking);
            }}
          />
        )}

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
