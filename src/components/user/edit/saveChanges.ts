import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { getImageFile } from "../../../fetch/fetch"
import { storage, User } from "../../../firebase/config"
import { updateUser } from "../udateUser"

interface Props {
  imageUrl: string
  inputs: [string, string]
  user: User
}

export const saveChanges = async ({ props }: { props: Props }) => {
  const { imageUrl, user, inputs } = props

  const file = await getImageFile(imageUrl, user.uid)
  if (!file) {
    alert("Please try again.")
    return
  }
  const uploadRef = ref(storage, `ai-persona-chat/${user.uid}/profile-image`)
  try {
    const snapshot = await uploadBytes(uploadRef, file)
    const url = await getDownloadURL(snapshot.ref)
    console.log(url)
    const userInfo: User = {
      uid: user.uid,
      name: user.name,
      persona: inputs,
      profileImage: url,
    }
    updateUser(userInfo)
  } catch (error) {
    console.log(error)
    alert("Please try again")
  }
}
