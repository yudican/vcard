import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/AuthApi"
import { contactLinkApi } from "./api/ContactLinkApi"
import { socialLinkApi } from "./api/SocialLinkApi"
import { socialNetworkApi } from "./api/SocialNetworkApi"
import { userApi } from "./api/UserApi"
import AuthReducer from "./reducer/AuthReducer"
import ContactLinkReducer from "./reducer/ContactLinkReducer"
import SocialLinkReducer from "./reducer/SocialLinkReducer"
import SocialNetworkReducer from "./reducer/SocialNetworkReducer"

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    socialLink: SocialLinkReducer,
    contactLink: ContactLinkReducer,
    socialNetwork: SocialNetworkReducer,
    [authApi.reducerPath]: authApi.reducer,
    [socialLinkApi.reducerPath]: socialLinkApi.reducer,
    [contactLinkApi.reducerPath]: contactLinkApi.reducer,
    [socialNetworkApi.reducerPath]: socialNetworkApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      socialLinkApi.middleware,
      contactLinkApi.middleware,
      contactLinkApi.middleware,
      socialNetworkApi.middleware,
      userApi.middleware
    ),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: true }),
})
