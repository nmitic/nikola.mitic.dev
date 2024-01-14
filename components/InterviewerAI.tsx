"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import SendIcon from "../public/send.svg";
import CloseIcon from "../public/close.svg";
import QuestionIcon from "../public/question.svg";
import profilePhoto from "../public/profile_photo.jpeg";
import { AnimatePresence, motion } from "framer-motion";

// this will fake openai response so that while testing locally there is no request to payed service
const TESTING_LOGIC_OUTSIDE_OF_OPEN_AI = false;

const fakeAnswer = (delay: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching data (replace this with your actual data or API call)
      const fakeData = "Fake data fetched successfully!";
      resolve(fakeData);
    }, delay);
  });
};

const fetchAnswer = async (
  question: FormDataEntryValue | null,
  fake = false
) => {
  if (fake) {
    const answer = await fakeAnswer(2000);
    return answer;
  }

  const response = await fetch(`/api/ask?query=${question}`);

  const { answer } = await response.json();

  return answer;
};

const LoadingDots = () => {
  return (
    <div className=" inline-flex space-x-2 justify-center items-center">
      <div className=" h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-1 w-1 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export const InterviewerAI = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [visible, setVisible] = useState(true);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitButtonDisabled = loading || !question?.length;

  const handleToggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const answer = await fetchAnswer(
        formData.get("query"),
        TESTING_LOGIC_OUTSIDE_OF_OPEN_AI
      );

      setAnswer(answer);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state with the new text area value
    setQuestion(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline character from being added to the textarea

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="visible-ai"
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed overflow-y-scroll max-h-[50vh] bottom-8 right-8 left-8 md:left-auto md:w-[350px] font-mono z-50 bg-black rounded-lg border-2"
        >
          <div className="relative pl-4 pr-4 pb-4 pt-10">
            <div
              tabIndex={0}
              className="  absolute top-1 left-1 w-8 bg-black cursor-pointer"
              onClick={handleToggleVisibility}
            >
              <CloseIcon />
            </div>
            <h1 className="mb-8">Interview me now!</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="relative flex">
                <textarea
                  rows={1}
                  className="w-full resize-none text-white bg-black border-2 pt-2 pb-2 pl-2 pr-8"
                  name="query"
                  value={question}
                  onChange={handleQuestionChange}
                  required
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="submit"
                  disabled={submitButtonDisabled}
                  className="absolute top-[50%] right-2 translate-y-[-50%] disabled:opacity-40"
                >
                  <SendIcon className="w-6 h-6 text-white" />
                </button>
              </div>
              <p className="mt-8">
                <>
                  <Image
                    className="border-solid border-4 border-black rounded-full w-[30px] inline-block mr-2"
                    src={profilePhoto}
                    alt="Nikola Mitic profile photo"
                    placeholder="blur"
                    priority
                    width={30}
                  />
                  <span className="align-middle">Nikola Mitic</span>
                </>
                <p className="text-sm mt-3 ml-[38px]">
                  {loading ? (
                    <span>
                      I am thinking, give me some time <LoadingDots />
                    </span>
                  ) : (
                    <>
                      {!!answer?.length ? (
                        <span>{answer}</span>
                      ) : (
                        <span>
                          Have an AI answer question based on my CV, blog and
                          portfolio! Ask anything!
                        </span>
                      )}
                    </>
                  )}
                </p>
              </p>
            </form>
          </div>
        </motion.div>
      ) : (
        <div className="fixed bottom-8 right-8">
          <div
            tabIndex={0}
            className="absolute top-[-1rem] left-[-1rem] w-8 cursor-pointer"
            onClick={handleToggleVisibility}
          >
            <QuestionIcon />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
