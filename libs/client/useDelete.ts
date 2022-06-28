import { useState } from "react";
import { APIResponse } from "types/response";

type Params = { [k: string]: string | number };

export default function useDelete(
  url: string
): [(params?: Params) => Promise<void>, boolean, APIResponse | null] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<APIResponse | null>(null);

  async function onDelete(params?: Params) {
    setIsLoading(true);
    try {
      let paramStr = "";
      if (params) {
        let isFirst = true;
        for (const key in params) {
          if (!isFirst) paramStr += "&";
          paramStr += `${key}=${params[key]}`;
          if (isFirst) isFirst = false;
        }
      }
      const res = await (
        await fetch(`${params ? url + "?" + paramStr : url}`, {
          method: "DELETE",
        })
      ).json();
      setResponse(res);
    } catch (error) {
      setResponse({ result: false });
    }
    setIsLoading(false);
  }

  return [onDelete, isLoading, response];
}
