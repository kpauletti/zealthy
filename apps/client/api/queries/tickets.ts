import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

const QUERY_KEY = "tickets";

export type TicketUser = {
  id: string;
  name: string;
  email: string;
};

export type Ticket = {
  id: string;
  user_id: string;
  description: string;
  status: "new" | "in_progress" | "resolved";
  photo_url: string;
  resolution: string;
  createdAt: string;
  updatedAt: string;
  user: TicketUser;
};

export const useGetTickets = () => {
  return useQuery<Ticket[]>({
    queryKey: [QUERY_KEY],
    queryFn: () => api.get("/tickets").then(res => res.data),
  });
};

export const useGetTicket = (id: string) => {
  return useQuery<Ticket>({
    queryKey: [QUERY_KEY, id],
    queryFn: () => api.get(`/tickets/${id}`).then(res => res.data.ticket),
    enabled: !!id,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<Ticket, Error, FormData>({
    mutationFn: ticket => api.post("/tickets", ticket).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<Ticket, Error, Partial<Ticket>>({
    mutationFn: ticket => api.put(`/tickets/${ticket.id}`, ticket).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
