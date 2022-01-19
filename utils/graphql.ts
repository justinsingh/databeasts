export async function fetchGraphQL(URL: string, query: string, queryName: string, variables: any) {
  const result = await fetch(
    URL,
    {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({
        query: query,
        variables: variables,
        operationName: queryName
      }),
    },
  );

  return await result.json();
}