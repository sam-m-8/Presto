import DashboardHeader from "../components/dashboard/DashboardHeader";
import PresentationList from "../components/dashboard/PresentationList";

function DashboardPage() {
  const dashboardContainerStyle = "bg-zinc-50 h-screen";

  return (
    <div className={dashboardContainerStyle}>
      <DashboardHeader />
      <PresentationList />
    </div>
  )
}

export default DashboardPage;