import { Data, imagePrompt } from "./prompts"

const url = "https://replicate-api-proxy.glitch.me/create_n_get/"

export const getImage = async (input: string) => {
  const src = await fetchData(imagePrompt(input))
  return src
}

export const getImageFile = async (src: string, fileName: string) => {
  try {
    const response = await fetch(src)
    const blob = await response.blob()
    const file = new File([blob], fileName, { type: blob.type })
    return file
  } catch (error) {
    console.log(error)
    alert("Fail to get image file.")
  }
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
