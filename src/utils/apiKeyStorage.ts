const STORAGE_KEY = "openweather_api_key"
const EXPIRATION_TIME_MS = 30 * 60 * 1000 // 30 minutes in milliseconds

interface StoredApiKey {
    apiKey: string
    expiresAt: number
}

export const saveApiKey = (key: string): void => {
    const expiresAt = Date.now() + EXPIRATION_TIME_MS
    const data: StoredApiKey = {
        apiKey: key,
        expiresAt,
    }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
        console.error("Failed to save API key to localStorage:", error)
    }
}

export const getApiKey = (): string | null => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (!storedData) {
            return null
        }

        const data: StoredApiKey = JSON.parse(storedData)

        if (!data.apiKey || !data.expiresAt) {
            clearApiKey()
            return null
        }

        if (Date.now() > data.expiresAt) {
            clearApiKey()
            return null
        }

        return data.apiKey
    } catch (error) {
        console.error("Failed to retrieve API key from localStorage:", error)
        clearApiKey()
        return null
    }
}

export const clearApiKey = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.error("Failed to clear API key from localStorage:", error)
    }
}

export const getTimeUntilExpiration = (): number => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (!storedData) {
            return 0
        }

        const data: StoredApiKey = JSON.parse(storedData)
        const remaining = data.expiresAt - Date.now()
        return remaining > 0 ? remaining : 0
    } catch {
        return 0
    }
}
