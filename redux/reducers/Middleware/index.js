const {getDefaultMiddleware} = require("@reduxjs/toolkit");
export const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})