import MainCardSlider from "@/component/main/MainCardContainer";
import MainMiddleBanner from "@/component/main/MainMiddleBanner";
import MainTab from "@/component/main/MainTab";
import MainSearchBar from "@/component/search/MainSearchBar";


async function getBackendStatus() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    try {
        const res = await fetch(`${API_URL}/health`, {
            cache : 'no-store',
            next : { revalidate : 0}
        })
        if (!res.ok) throw new Error();
        return await res.json()

    } catch (error) { 
        return { status : 'offline'}
    }
}

export default function Page() {
    
    return (
        <div className="flex flex-col gap-6">
            <MainSearchBar />
            <MainCardSlider />
            <MainMiddleBanner />
            <MainTab />
        </div>
        
    )
}