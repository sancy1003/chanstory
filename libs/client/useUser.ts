import { User } from "@prisma/client";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/user");
  return { user: data?.profile, isLoading: !data && !error };
}
