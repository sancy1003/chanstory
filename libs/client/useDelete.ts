interface Response {
  result: boolean;
  error?: string;
}

export default async function useDelete(url: string): Promise<Response> {
  const response = await (
    await fetch(url, {
      method: "DELETE",
    })
  ).json();

  return response;
}
