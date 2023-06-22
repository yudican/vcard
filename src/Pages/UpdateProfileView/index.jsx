import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CardInfo from "../../Components/CardInfo"
import ContactInfo from "../../Components/ContactInfo"
import { ColorPicker } from "../../Components/Form"
import Header from "../../Components/Header"
import LinkInfo from "../../Components/LinkInfo"
import InputContact from "../../Components/ModalInputContact"
import InputLink from "../../Components/ModalInputLink"
import ModalInputSocialNetwork from "../../Components/ModalInputSocialNetwork"
import SocialNetwork from "../../Components/SocialNetwork"
import { useGetContactLinksQuery } from "../../Redux/api/ContactLinkApi"
import { useGetLinksQuery } from "../../Redux/api/SocialLinkApi"
import { useGetSocialNetworksQuery } from "../../Redux/api/SocialNetworkApi"
import { useGetUserMutation } from "../../Redux/api/UserApi"
import { setUser } from "../../Redux/reducer/AuthReducer"
import { setContactLinks } from "../../Redux/reducer/ContactLinkReducer"
import { setSocialLinks } from "../../Redux/reducer/SocialLinkReducer"
import { setSocialNetworks } from "../../Redux/reducer/SocialNetworkReducer"
import { socialNetworkContainer } from "../../utils/styles"
import LoadingOverlay from "react-loading-overlay"
import { Button } from "antd-mobile"
const UpdateProfileView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { socialLinks } = useSelector((state) => state.socialLink)
  const { contactLinks } = useSelector((state) => state.contactLink)
  const { socialNetworks } = useSelector((state) => state.socialNetwork)
  const { user } = useSelector((state) => state.auth)

  const [selectedColor, setSelectedColor] = useState(user?.color)
  const getSocialLink = useGetLinksQuery()
  const getContactLink = useGetContactLinksQuery()
  const getSocialNetwork = useGetSocialNetworksQuery()
  // console.log(getSocialLink)
  useEffect(() => {
    if (getSocialLink.isSuccess || getSocialLink.isFetching) {
      dispatch(setSocialLinks(getSocialLink?.data?.data))
    }
    if (getContactLink.isSuccess || getContactLink.isFetching) {
      dispatch(setContactLinks(getContactLink?.data?.data))
    }
    if (getSocialNetwork.isSuccess || getSocialNetwork.isFetching) {
      dispatch(setSocialNetworks(getSocialNetwork?.data?.data))
    }
  }, [
    getSocialLink.isSuccess,
    getSocialLink.isFetching,
    getContactLink.isSuccess,
    getContactLink.isFetching,
    getSocialNetwork.isSuccess,
    getSocialNetwork.isFetching,
  ])

  const [getUser, { isLoading }] = useGetUserMutation()
  const loadUser = useCallback((name) => {
    getUser(name).then(({ error, data }) => {
      dispatch(setUser(data?.data))
      return navigate("/" + user?.username)
    })
  }, [])
  // state
  return (
    <LoadingOverlay active={isLoading} spinner text="Loading your content...">
      <div style={{ paddingBottom: 20 }}>
        <Header
          actionTitle="View Card"
          paddingBottom={10}
          onClick={() => {
            loadUser(user?.username)
          }}
          type={"light"}
          extra={
            <Button
              size="small"
              fill="outline"
              color="#fff"
              style={{ marginRight: 5 }}
              onClick={() => navigate("/update-password")}
            >
              Update Password
            </Button>
          }
        />
        <div style={{ paddingRight: 20, paddingLeft: 20 }}>
          {/* card */}
          <div style={{ marginTop: 20 }}>
            <CardInfo color={selectedColor} edit />
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                ...socialNetworkContainer,
                justifyContent: "space-between",
              }}
            >
              <ColorPicker
                color={"#ff4757"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#3742fa"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#000"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#2f3542"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#ffa502"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#2ed573"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
              <ColorPicker
                color={"#182C61"}
                onClick={(e) => setSelectedColor(e)}
                selected={selectedColor}
              />
            </div>
          </div>
          {/* end card */}

          {/* start links */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
              Links
            </p>
            <div style={{ marginBottom: 5 }}>
              {socialLinks &&
                socialLinks.map((link) => (
                  <LinkInfo
                    key={link.id}
                    update
                    item={link}
                    refetch={() => getSocialLink.refetch()}
                  />
                ))}
            </div>
            <div style={socialNetworkContainer}>
              <InputLink refetch={() => getSocialLink.refetch()} />
            </div>
          </div>
          {/* start links */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
              Contact
            </p>
            <div style={{ marginBottom: 5 }}>
              {contactLinks &&
                contactLinks.map((contact) => (
                  <ContactInfo
                    item={contact}
                    key={contact?.id}
                    refetch={() => getContactLink.refetch()}
                    update
                  />
                ))}
            </div>
            <div style={socialNetworkContainer}>
              <InputContact refetch={() => getContactLink.refetch()} />
            </div>
          </div>
          {/* start links */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontSize: 18, color: "#2c3e50" }}>
              Social Network
            </p>
            <div style={{ ...socialNetworkContainer, marginBottom: 5 }}>
              {socialNetworks &&
                socialNetworks.map((network) => (
                  <SocialNetwork
                    item={network}
                    key={network?.id}
                    update
                    refetch={() => getSocialNetwork.refetch()}
                  />
                ))}
            </div>
            <div>
              <ModalInputSocialNetwork
                refetch={() => getSocialNetwork.refetch()}
              />
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default UpdateProfileView
