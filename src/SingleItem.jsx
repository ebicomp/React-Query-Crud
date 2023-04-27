import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteTask, useUpdateTask } from "./useFetchCustomHooks";
import { toast } from "react-toastify";
import customFetch from "./utils";
const SingleItem = ({ item }) => {
  const { updateTask } = useUpdateTask();

  const { deleteTask } = useDeleteTask();

  return (
    <div className="single-item">
      <input type="checkbox" checked={item.isDone} onChange={() => updateTask({ id: item.id, isDone: !item.isDone })} />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through"
        }}
      >
        {item.title}
      </p>
      <button className="btn remove-btn" type="button" onClick={() => deleteTask(item.id)}>
        delete
      </button>
    </div>
  );
};
export default SingleItem;
