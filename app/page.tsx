import { Metadata } from "next";
import MenuItem from "../components/MenuItem";
import { GraphQLClient, gql } from "graphql-request";
import { JobsData } from "../types/cv";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const query = gql`
  query GetJobs {
    jobs(last: 1, orderBy: startDate_ASC) {
      slug
    }
  }
`;

const Home = async () => {
  const {
    jobs: [lastJob],
  }: JobsData = await client.request(query);

  const MENU_ITEMS = [
    {
      href: `/cv/${lastJob.slug}`,
      text: "CV",
    },
    {
      href: "/portfolio",
      text: "Portfolio",
    },
    {
      href: "/tiny_thoughts",
      text: "TINY THOUGHTS",
    },
  ];

  return (
    <section className="flex h-full justify-center items-center">
      <nav>
        <ul className="leading-10">
          {MENU_ITEMS.map((item) => {
            return (
              <MenuItem href={item.href} text={item.text} key={item.href} />
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export const metadata: Metadata = {
  title: "Nikola Mitic - Senior Frontend Developer",
  description:
    "Discover the impressive expertise and talent of a seasoned professional in web development. Explore a captivating portfolio showcasing a wide range of skills and accomplishments. Unlock the possibilities of collaborating with an accomplished individual passionate about web development.",
};

export default Home;
