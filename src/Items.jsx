import SingleItem from "./SingleItem";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
import axios from "axios";
import { useFetchTask } from "./useFetchCustomHooks";

const Items = () => {
  const { isLoading, data, isError, error } = useFetchTask();

  console.log(data);
  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>is loading...</p>;
  }
  // if (isError) {
  //   return <p style={{ marginTop: "1rem" }}>there was an error</p>;
  // }

  if (error) {
    return <p style={{ marginTop: "1rem" }}>{error.message}</p>;
  }

  return (
    <div className="items">
      {data.taskList.map(item => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
