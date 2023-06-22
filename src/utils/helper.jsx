import { message } from "antd"

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }

  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }

  return isJpgOrPng && isLt2M
}

const getImg = (file) => {
  if (file) {
    return `http://localhost:8000/storage/${file}`
  }

  return ""
}

// add http:// to url
const addHttp = (url) => {
  if (url.indexOf("https://") === -1) {
    return `https://${url}`
  }

  if (url.includes("http://")) {
    return `https://${url}`
  }

  return url
}

export { getBase64, beforeUpload, getImg, addHttp }
