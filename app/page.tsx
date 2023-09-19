import MainComponent from "@/components/MainComponent"
import NavComponent from "@/components/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

export default function Home() {
  return (
    <div className="flex flex-row w-full h-full place-content-center">
      <NavComponent />
      <MainComponent />
      <RightSectionComponent />
    </div>
  )
}
