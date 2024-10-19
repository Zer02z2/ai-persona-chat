import { Data, imagePrompt } from "./prompts"

const url = "https://replicate-api-proxy.glitch.me/create_n_get/"

export const getImage = async (input: string) => {
  const src = await fetchData(imagePrompt(input))
  return src
}

export const fetchData = async (
  data: Data[keyof Data]
): Promise<string | undefined> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data["data"]),
  }
  console.log("Start fetching")
  const response = await fetch(url, options)
  const parsedResponse = await response.json()
  switch (data["type"]) {
    case "text":
      try {
        const result = parsedResponse.output
          .join("")
          .match(/\+([^+]+)\+/)[1]
          .trim()
        return result
      } catch (error) {
        console.log(error)
        break
      }
    case "image":
      try {
        const result = parsedResponse.output
        return result
      } catch (error) {
        console.log(error)
        break
      }
  }
}
