import React from "react";
import customFetch from "./utils";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const useFetchTask = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    }
  });
  return { isLoading, data, isError, error };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTak, isLoading } = useMutation({
    mutationFn: newTitle => customFetch.post("/", { title: newTitle }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("New task added");
      //   setNewItemName("");
    },
    onError: error => {
      toast.error(error.response.data.msg);
    }
  });
  return { createTak, isLoading };
};
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTask } = useMutation({
    mutationFn: ({ id, isDone }) => customFetch.patch(`/${id}`, { isDone }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Updated");
    },
    onError: error => {
      toast.error(error.response.data.msg);
    }
  });
  return { updateTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationFn: id => customFetch.delete(`/${id}`),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted");
    },
    onError: error => {
      toast.error(error.response.data.msg);
    }
  });
  return { deleteTask };
};
