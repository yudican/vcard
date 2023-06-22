import React, { useCallback, useEffect } from "react"
import LoadingOverlay from "react-loading-overlay"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ActionButton from "../../Components/ActionButton"
import CardInfo from "../../Components/CardInfo"
import ContactInfo from "../../Components/ContactInfo"
import Header from "../../Components/Header"
import LinkInfo from "../../Components/LinkInfo"
import SocialNetwork from "../../Components/SocialNetwork"
import { useGetUserMutation } from "../../Redux/api/UserApi"
import { setUser } from "../../Redux/reducer/AuthReducer"
import {
  actionButtonContainer,
  socialNetworkContainer,
} from "../../utils/styles"
import { ReactComponent as ProfileEmpty } from "../../Assets/Img/profile-empty.svg"
import { ReactComponent as ActivatedCard } from "../../Assets/Img/activate-card.svg"

const ProfileView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { name } = useParams()
  const { token, user } = useSelector((state) => state.auth)
  const {
    socialLink = [],
    contactInfo = [],
    socialnetwork = [],
  } = user?.details || {}
  const [getUser, { isLoading }] = useGetUserMutation()
  // console.log(getSocialLink)
  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = useCallback(() => {
    getUser(name).then(({ error, data }) => {
      if (error) {
        return navigate("/page-not-found")
      }
      dispatch(setUser(data?.data))
    })
  }, [name])

  const handleDownload = (user_id, filename) => {
    return window.open(`http://localhost:8000/api/user/get-contact/${user_id}`)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
  }

  if (isLoading) {
    return (
      <LoadingOverlay
        styles={{ height: "100vh" }}
        active={isLoading}
        spinner
        text="Loading your content..."
      >
        <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
      </LoadingOverlay>
    )
  }

  if (token) {
    if (!user?.profile) {
      return (
        <div>
          <Header
            actionTitle={"Keluar"}
            onClick={() => logout()}
            type={"light"}
            paddingBottom={0}
          />
          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "90vh",
              paddingTop: 50,
              paddingBottom: 20,
            }}
          >
            <ProfileEmpty height={350} />
            {/* button */}
            <div style={{ ...actionButtonContainer, width: "100%" }}>
              <ActionButton
                title={"Input Profile"}
                backgroundColor={"#fff"}
                color={"#000"}
                borderColor={"#eaeaea"}
                width={"100%"}
                onClick={() => navigate("/update-profile")}
              />

              {/* <ActionButton title={"Exchange Contact"} /> */}
            </div>
          </div>
        </div>
      )
    }

    if (!user?.card_active) {
      return (
        <div>
          <Header
            actionTitle={"Keluar"}
            onClick={() => logout()}
            type={"light"}
            paddingBottom={0}
          />
          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "90vh",
              paddingTop: 30,
              paddingBottom: 20,
            }}
          >
            <ActivatedCard height={350} />
            {/* button */}
            <div style={{ ...actionButtonContainer, width: "100%" }}>
              <ActionButton
                title={"Activate Card"}
                backgroundColor={"#fff"}
                color={"#000"}
                borderColor={"#eaeaea"}
                width={"100%"}
                onClick={() => navigate("/update-profile")}
              />

              {/* <ActionButton title={"Exchange Contact"} /> */}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <Header
        actionTitle={token ? "Update Profile" : "Dapatkan Kartu"}
        onClick={() => {
          if (token) {
            return navigate("/update-profile")
          }
          return (window.location.href = "https://zetocard.com")
        }}
        type={"light"}
      />

      <div style={{ paddingRight: 20, paddingLeft: 20, marginTop: -70 }}>
        {/* card */}
        <CardInfo color={user?.color} />

        {/* button */}
        <div style={actionButtonContainer}>
          <ActionButton
            title={"Save Contact"}
            backgroundColor={"#fff"}
            color={"#000"}
            borderColor={"#eaeaea"}
            width={"100%"}
            onClick={() => handleDownload(user?.id, user?.name + ".vcf")}
          />

          {/* <ActionButton title={"Exchange Contact"} /> */}
        </div>
        {/* about us */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
            About
          </p>
          <p style={{ fontWeight: 500, fontSize: 16, color: "#bdc3c7" }}>
            {user?.description}
          </p>
        </div>

        {/* Social Netwok */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
            Social network
          </p>
          <div style={socialNetworkContainer}>
            {socialnetwork &&
              socialnetwork.map((network) => (
                <SocialNetwork item={network} key={network?.id} />
              ))}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
            Links
          </p>
          {socialLink &&
            socialLink.map((link) => <LinkInfo key={link.id} item={link} />)}
        </div>

        {/* Contact Info */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
            Contact info
          </p>
          {contactInfo &&
            contactInfo.map((contact) => (
              <ContactInfo item={contact} key={contact?.id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileView
