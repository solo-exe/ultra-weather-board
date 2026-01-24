import { type FormEventHandler } from "react"

type Props = {
    handleApiKeySubmit: FormEventHandler<HTMLFormElement>
}

const ApiKeyForm = ({ handleApiKeySubmit }: Props) => {
    return (
        <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4 max-w-2xl mb-8">
            <h2 className="text-2xl font-semibold">OpenWeather API Key (Optional)</h2>
            <p className="text-sm text-muted-foreground">
                If you have an API key for OpenWeather, you can paste it here to utilize over the
                1,000 free requests per day. Your API key will be securely stored in your browser's
                localStorage and will automatically expire after 30 minutes.
            </p>
            <form onSubmit={handleApiKeySubmit} className="flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    name="apiKey"
                    placeholder="Paste your API key"
                    className="flex-1 px-3 py-2 rounded-md bg-sidebar border border-muted-foreground/20 text-foreground placeholder:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ApiKeyForm
