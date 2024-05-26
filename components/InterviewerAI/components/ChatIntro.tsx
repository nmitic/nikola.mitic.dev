import Link from "next/link";
import { Alert } from "../../ui/Alert";
import { Button } from "../../ui/Button";

export const Intro = () => {
  return (
    <>
      <h1 className="text-center mb-6 text-xl">
        Hi there 👋. I am Niko's chat AI clone. Ask anything!
      </h1>
      <div className=" mb-6 text-center">
        <Alert>
          <span>
            Do you want to <span className=" font-bold">talk</span> instead of
            chat?
          </span>
          <Button>
            <Link href={"/ai_clone_interview/talk"}>Yes, please!</Link>
          </Button>
        </Alert>
      </div>
      <p>
        I will answer based on Niko's resume and blog. If you are out of ideas
        what to ask, you can enable auto interview and pre defined set of
        question will be asked.
      </p>
      <p>
        <span className="font-bold"> Please note:</span> In no way your question
        is being stored. If in doubt please refer to{" "}
        <Link
          href={"/portfolio/ai-personal-interviewer"}
          className=" underline"
        >
          open source of this project.
        </Link>
      </p>
    </>
  );
};
