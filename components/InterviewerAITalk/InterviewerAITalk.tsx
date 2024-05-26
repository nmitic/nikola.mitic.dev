"use client";

import { useState } from "react";
import { TalkStatusEnum, TalkStatus } from "./components/TalkStatus";
import { AudioAnswer } from "./components/AudioAnswer";
import { QuestionTranscript } from "./components/QuestionTranscript";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";

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
      <div className="lg:w-[60%] mx-auto">
        <h1 className="text-center text-xl mb-6">
          Hi there 👋. I am Niko's voice AI clone. Ask anything!
        </h1>
        <div className=" mb-6 text-center">
          <Alert>
            <span>
              Do you want to <span className=" font-bold">chat</span> instead of
              talk?
            </span>
            <Button>
              <Link href={"/ai_clone_interview/chat"}>Yes, please!</Link>
            </Button>
          </Alert>
        </div>
        <p>Click on the button bellow and use your voice to ask questions!</p>
        <p>I will answer based on Niko's resume and blog.</p>
        <p>
          <span className="font-bold"> Please note:</span> In no way your voice
          is being stored. If in doubt please refer to{" "}
          <Link
            href={"/portfolio/ai-personal-interviewer"}
            className=" underline"
          >
            open source of this project.
          </Link>
        </p>
      </div>
      <TalkStatus
        status={talkStatus}
        onStart={() => {
          setTalkStatus(TalkStatusEnum.listening);
        }}
        onStop={() => {
          setTalkStatus(TalkStatusEnum.notListening);
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
