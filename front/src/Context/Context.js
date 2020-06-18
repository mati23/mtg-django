import React, { createContext, useState, useContext } from 'react'

const CardInformationContainerContext = createContext()
const AvatarThumbnailContext = createContext()

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

export function AvatarThumbnailContextProvider({ children }) {
    const [avatarSelected, setAvatarSelected] = useState(parseInt(null))

    return (
        <AvatarThumbnailContext.Provider value={{ avatarSelected, setAvatarSelected }}>
            {children}
        </AvatarThumbnailContext.Provider>
    )
}

export function useAvatarThumbnailContext() {
    const context = useContext(AvatarThumbnailContext)
    if (!context) throw new Error("useCount must be used within a CountProvider");
    const { avatarSelected, setAvatarSelected } = context
    return { avatarSelected, setAvatarSelected }
}

