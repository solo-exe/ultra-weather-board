import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import Card from "./components/cards/Card"
import DailyForecast from "./components/cards/DailyForecast"

function App() {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: async () => await getWeather({ lat: 6.547329, lon: 3.393668 }),

        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        refetchOnReconnect: false,
    })

    return (
        <div className="flex flex-col gap-8">
            <Card title="Current Weather">{JSON.stringify(data?.current ?? "").slice(0, 100)}</Card>
            <Card title="Hourly Forecast (48 Hours)">
                {JSON.stringify(data?.hourly ?? "").slice(0, 100)}
            </Card>
            <DailyForecast />
        </div>
    )
}

export default App

// <div className="p-8 flex flex-col items-center gap-6 min-h-screen bg-[#242424] text-white font-sans">
//     <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//         Weather Dashboard
//     </h1>

//     <button
//         onClick={() => refetch()}
//         disabled={isFetching}
//         className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-lg font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//     >
//         {isFetching ? "Loading..." : "Check Weather"}
//     </button>

//     {data && (
//         <div className="w-full max-w-md bg-[#2a2a2a] p-6 rounded-xl border border-white/10 shadow-xl overflow-auto">
//             <pre className="text-sm text-gray-300 whitespace-pre-wrap">
//                 {JSON.stringify(data, null, 2)}
//             </pre>
//         </div>
//     )}
// </div>
