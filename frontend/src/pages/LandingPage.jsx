import landingPageSlides from '../assets/landingPageSlides.svg';
import LandingHeader from "../components/landing/LandingHeader.jsx";
import LandingInfoCard from "../components/landing/LandingInfoCard.jsx";


const LandingPage = () => {
  const landingContainerStyle = "bg-gradient-to-r from-indigo-600 to-purple-600 h-screen";
  const landingBodyStyle = "flex px-7 flex-col lg:flex-row py-6 mt-7 xl:mt-0 xl:py-0";
  const landingImageStyle = "flex-1";

  return (
    <div className={landingContainerStyle}>
      <LandingHeader />
      <div className={landingBodyStyle}>
        <LandingInfoCard />
        <img className={landingImageStyle} src={landingPageSlides} />
      </div>
    </div>
  )
}

export default LandingPage;