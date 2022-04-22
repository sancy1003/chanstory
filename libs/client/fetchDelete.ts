interface Response {
  result: boolean;
  error?: string;
}

export default async function fetchDelete(url: string): Promise<Response> {
  const response = await (
    await fetch(url, {
      method: "DELETE",
    })
  ).json();

  return response;
}
