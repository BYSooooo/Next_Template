import MainCardSlider from "@/component/main/MainCardContainer";
import MainMiddleBanner from "@/component/main/MainMiddleBanner";
import MainTab from "@/component/main/MainTab";
import MainSearchBar from "@/component/search/MainSearchBar";

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