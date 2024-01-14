"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";

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

export const InterviewerAI = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const answer = await fetchAnswer(formData.get("query"));

      setAnswer(answer);
      setQuestion("");
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
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the newline character from being added to the textarea

      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  return (
    <div className=" fixed top-20 right-20 w-[300px] font-mono">
      <h1>Have an interview with me right now!</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <textarea
          rows={1}
          className="w-full resize-none text-white bg-black border-2 p-3"
          name="query"
          value={question}
          onChange={handleQuestionChange}
          required
          onKeyDown={handleKeyDown}
        />
        <button type="submit" disabled={loading}>
          Ask!
        </button>
        {loading ? (
          <p>Give me some time, I am thinking....</p>
        ) : (
          <p>{answer}</p>
        )}
      </form>
    </div>
  );
};
