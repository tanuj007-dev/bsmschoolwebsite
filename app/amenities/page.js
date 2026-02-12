import PageHero from '../Components/page-hero';
import WhatsAppSticky from '../Components/stickywhatup';
import ProgramsSection from '../Components/school-features';
import DaycareSection from '../Components/daycare';
import ExtraCurricular from '../Components/extracircular';
import AwardsAchievementsSlider from '../Components/awardsachievementsslider';


export default function Amenities() {
  return (
    <>
      <PageHero
        title="Amenities"
        breadcrumbItems={[
          { label: "Amenities" }
        ]}
        backgroundImage="/gallery/gooD3jqYRKexi6Bkq2zSdNtSQW_aABNj2BM7YuAWgfxslK8pEce3DLNkG3J6KNREr9TSgjHH1rpg6DTaYEk6NyhtkgEBSSVAGNQUh_D9yJg.jpg"
      />
      <WhatsAppSticky />
      <ProgramsSection />
      <DaycareSection />
      <ExtraCurricular />
      <AwardsAchievementsSlider />



    </>
  );
}