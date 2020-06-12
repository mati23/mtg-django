import React, { createContext, useState, useContext } from 'react'

const CardInformationContainerContext = createContext()

export default function CardInformationContainerContextProvider({ children }) {
    const [cardVisible, setCardVisible] = useState(false)

    return (
        <CardInformationContainerContext.Provider value={{ cardVisible, setCardVisible }}>
            {children}
        </CardInformationContainerContext.Provider>
    )
}

export function useCardInformationContext() {
    const context = useContext(CardInformationContainerContext)
    if (!context) throw new Error("useCount must be used within a CountProvider");
    const { cardVisible, setCardVisible } = context
    return { cardVisible, setCardVisible }
}