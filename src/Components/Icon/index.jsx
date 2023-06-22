import React from "react"

const Icon = ({ type, color = "#000", size = 20 }) => {
  switch (type) {
    case "telepon":
      return (
        <IconItem
          size={size}
          url={"https://img.icons8.com/ios-glyphs/30/000000/iphone.png"}
        />
      )
    case "email":
      return (
        <IconItem
          size={size}
          url={"https://img.icons8.com/ios/50/000000/new-post.png"}
        />
      )
    case "website":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/ios/50/000000/globe--v1.png"
        />
      )
    case "linkdin":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/fluency/48/000000/linkedin-2.png"
        />
      )
    case "instagram":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/fluency/48/000000/instagram-new.png"
        />
      )
    case "facebook":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/fluency/48/000000/facebook-circled.png"
        />
      )
    case "twitter":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/twitter--v1.png"
        />
      )
    case "address":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/ios-filled/50/000000/address--v1.png"
        />
      )
    case "github":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/glyph-neue/64/000000/github.png"
        />
      )
    case "gitlab":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/gitlab.png"
        />
      )
    case "dribble":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/office/30/000000/dribbble.png"
        />
      )
    case "sketch":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/plasticine/100/000000/sketch.png"
        />
      )
    case "reddit":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/doodle/48/000000/reddit--v4.png"
        />
      )
    case "youtube":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/youtube-play.png"
        />
      )
    case "gplus":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/fluency/48/000000/google-plus.png"
        />
      )
    case "whatsapp":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
        />
      )
    case "telegram":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
        />
      )
    case "tiktok":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/tiktok--v1.png"
        />
      )
    case "vimeo":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/vimeo.png"
        />
      )
    case "spotify":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/fluency/48/000000/spotify.png"
        />
      )
    case "nimotv":
      return (
        <IconItem
          size={size}
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiR8B5l7o7jxohEPRqM6zkkQD65KXLht2yZqyn89Telw&s"
        />
      )
    case "pinterest":
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/color/48/000000/pinterest--v1.png"
        />
      )
    case "snackvideo":
      return (
        <IconItem
          size={size}
          url="https://1.bp.blogspot.com/-L4nl5DATfhU/YDoH4wH_uEI/AAAAAAAAGvQ/c3-8viq5lAUWsHnGTXU89BMJj5e81avAQCNcBGAsYHQ/w195-h200/snack%2Bvideo.JPG"
        />
      )

    default:
      return (
        <IconItem
          size={size}
          url="https://img.icons8.com/ios-glyphs/30/000000/iphone.png"
        />
      )
  }
}
const IconItem = ({ url, size = 20 }) => {
  return <img src={url} alt="" style={{ height: size }} />
}

export default Icon
