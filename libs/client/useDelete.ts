import { useState } from "react";
import { APIResponse } from "types/response";

export default function useDelete(
  url: string
): [(params: string) => Promise<void>, boolean, APIResponse | null] {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<APIResponse | null>(null);
  async function onDelete(params: string) {
    setLoading(true);
    try {
      const res = await (
        await fetch(`${url}${params ? `?${params}` : ""}`, {
          method: "DELETE",
        })
      ).json();
      setResponse(res);
    } catch (error) {
      setResponse({ result: false });
    }
    setLoading(false);
  }

  return [onDelete, loading, response];
}
