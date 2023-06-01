import Sings from "../../components/Sings/Sings";
import { getAllThoughtsAndSortThemByStartDate } from "./utils";

const TinyThoughts = () => {
  const allTinyThoughts = getAllThoughtsAndSortThemByStartDate();
  return <Sings sings={allTinyThoughts} />;
};

export default TinyThoughts;
