import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import LinkIcon from "../../../public/link-icon.svg";
import CodeIcon from "../../../public/code.svg";
import ToolIcon from "../../../public/tool.svg";
import { PortfolioData } from "../../../types/portfolio";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const PortfolioPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlug($slug: String) {
      portfolio(where: { slug: $slug }) {
        imagePreview {
          url
          width
        }
        title
        techStackTools
        sourceCodeLink
        liveLink
        description {
          html
        }
      }
    }
  `;
  const data: PortfolioData = await client.request(query, { slug });

  return (
    <div>
      <div className="sticky top-3 -z-10 mb-8">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60"></div>
        <Image
          width={data.portfolio.imagePreview.width}
          height={600}
          priority
          placeholder="blur"
          unoptimized
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAGYAz4DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAEEBQMC/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDiiAAAAAAAIAAACAAIqAAgAAIACAAiKgCKgCKgIACAgCKgCKgIACIqAIqAIqAIqAAAAAAAAAAAAAoACooAAKAAACgAAAAAAAKigAAAAAAAgAAAAAAAAAAAAAAAAOiAAAAAAgAAAAgAACAAioAioAioAioAioAioAgAgAIioAioCAAiKgCKgCKgIAAgAAAIAAAKIoAAAAKAAqKAAAqKAAAqKAAAAAAAAAqAKIAqAAAAAAAAAAAAAAAAAAADoiAKIAqAAAACAAAAgAAIAAgAIACAAgAgAICAIqAIqAgAIioAioAgAgAIACAAAgAAAAAAKIoAACooAAKAAACgAAAoigAAAAAAAAAAAAAAAAAAAAAAAAAACAKIA6IAAAAgCoAAACAACAqAAgAAgAIACAIqAIqAIACACAgCKgCAAgAgIAioAioAACAAAAAAAAAAoAAAKIoCoAoACoAoAAAKIAoigAAAAAAAAAAAAAACAKIAAAAAAAAA6AAAAAgCiAAAAgACAqAAIAAgAIACAAgAIACAIqAIAICAAgCKgCAAgAgACAAAAIAogCiKAAAqAKAAACiKAqAKAAACiAKAAAAAAqAKIAogAAAAAAAAAAAAAAAIAogDoCAKIAogCoAAICiAAICoAAgACAAgAIACAAgAIACAIACAAgAgIAioAioAioAAAgAAAAAAAKgCgAAAoigAAoigAAogCgAAAogCiAKIAogCiAKIAogCiAKIAAAAAAAAAAA3iAKIAAACAKIAAgKIAAgKgACAAgACAAgAIACAAgCKgCAAgAgIACAAgAACAAAAAAAAAAAAACiKAACiAKAAqAKIoAAKIAogCiKAAAAAAAAAAACAogCiAKIAogCoAAANwgCiAKIAqAAIAogACAogAIAqCAqAAIACAAgAIACACAAgAIACCAAgAACAAAAIAAAAAAAogCiKAAAqAKIoAAKIAoAAAKIAogCgAAAAAAAAAAAAAAACAKIAogCiAKIA2iAKIAogCiAKgACAKIACAKgACAAgCoICoICoACAAgAIACAAggAIAAAgAAgAAAAAAAAAAAAAACoAoigAAKgCiKAAAACiAKIAoigAAAAAAAAAAAAAAAAAgKIAogCiANggCiAKIAogCiAAgCiAKggKIACAKggKIACAAgACAAgAIACAAgAACAACAAAAAAAAAAAAAAAAAAAAAKgCiKAAAACiAKIAoigAAAAAAAAAAAAAAAAAAAAAAAAAA1CAKIAogCiAKIACAKIAqCAogCoICiAAgACAqCAqAAgAIAAgACAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAogCiKAAAAAAAAAAAAAAAAAAAAAAAAAAAADSIAogCiAKIAogAIAogCoICiAKggKIAAgKggKIACAAICoACAACAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACiAKIAogCiAKIAogCiAKIAogCiAKIA0CAKIAogCiAKIACAKIAqCAogCoAAgCoICiAAgCoAAgAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9hAFEAUQBRAFQABAFEAUQAEAUQABAUQABAUQAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAegAAICiAKIAogCoAAAAgCoAAAAgCoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7AAAAAABAUQAAAAAAAEAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH2AAAAACCoAAAAAAAigIAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAAAAAAAQUBBUAAARQEFQAAAABFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHoAAAAAAACCgIKAgqAAAgoCAAIoCCoAAAigIKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPUUBBQEFAQAAAEFAQUBAAQUBBUARQEFQBFAQVAAAQUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAewoCCgIKAgoCAAAAgoCCoAigIKgCKAgqAIoCAAIoCAAIoCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAgoCCgIKAgqAAAgoCCoAigIKgCKAgAIKgCKAgqAIoCAAIoCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0CgIKAgoCCoAAAACCgIAAigIACCgIACCoAioAACAAIoCAAIoCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0gAAAAAAAAAgqAAAIoCAAIoCAAgqAIoCAAgqAIoCAAgqAAAgqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1AAIoCCoAAAAAAAioAAAioAAAioAACAAIqAIqAAAgACKgAACKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQAAAAAIAAAAAAACAAAAgACAAACAAIACAAACAAIAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z"
          src={data.portfolio.imagePreview.url}
          alt={`image preview of the project of named ${data.portfolio.title}`}
        />
      </div>
      <article className="prose prose-invert mx-auto grid grid-cols-1">
        <h1>{data.portfolio.title}</h1>
        <div className="bg-white p-4 rounded-xl float-left mr-4 mb-4 w-full md:w-auto relative z-0 break-inside-avoid">
          <div>
            <a href={data.portfolio.liveLink} className="text-black block mb-3">
              <LinkIcon className="inline-block align-middle fill-black w-6 h-6 mr-2 mb-2" />{" "}
              {data.portfolio.liveLink}
            </a>
            <a href={data.portfolio.liveLink} className="text-black block mb-3">
              <CodeIcon className="inline-block align-middle w-6 h-6 mr-2 mb-2" />{" "}
              {data.portfolio.sourceCodeLink}
            </a>
            <a href={data.portfolio.liveLink} className="text-black block mb-3">
              <ToolIcon className="inline-block align-middle w-6 h-6 mr-2 mb-2" />{" "}
              {data.portfolio.techStackTools.map((item) => (
                <span className=" bg-gray-400 text-white inline-block mr-2 mb-2 p-1 rounded-md">
                  {item}
                </span>
              ))}
            </a>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.portfolio.description.html }}
        ></div>
      </article>
    </div>
  );
};

export default PortfolioPage;
