import React from 'react'

const Context = React.createContext()

export const ContextProvider = Context.Provider
export const ContextConsumer = Context.Consumer

export default Context