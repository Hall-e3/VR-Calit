import { twMerge } from "tailwind-merge";
import { useCalculator } from "../context/CalculatorContext";

interface BuildingStepProps {
  activeSection: string | null;
  progress: { from: string; ratio: number } | null;
  onStepClick: (sectionId: string) => void;
}

const BuildingStep: React.FC<BuildingStepProps> = ({
  activeSection,
  progress,
  onStepClick,
}) => {
  const {
    selectedInvestment,
    hasBuildingModels,
    amenities,
    needsApartmentModels,
    overallApartments,
    uniqueApartments,
    averageRooms,
    hasEnvironmentModel,
    plotDetail,
    highlightAnimation,
    filteringSorting,
    languages,
    heroAnimation,
  } = useCalculator();

  function calculateBuildingsPrice() {
    let price = 0;

    // Investment type price
    if (selectedInvestment === "single_house") price += 450;
    else if (selectedInvestment === "multiple_house") price += 375;
    else if (
      selectedInvestment === "single_apartment" ||
      selectedInvestment === "multiple_apartment"
    )
      price += 750;

    // Documentation price
    if (hasBuildingModels === false) price += 1350;
    else if (hasBuildingModels === true) price += 1050;

    // Amenities price
    if (amenities) price += 300;

    return price;
  }

  function calculateEnvironmentPrice() {
    if (hasEnvironmentModel === true) return 0;

    let price = 30; // Base creation fee

    // Plot detail price
    if (plotDetail === "grass_trees") price += 630;
    else if (plotDetail === "detailed") price += 930;
    else if (plotDetail === "photogrammetry") price += 1230;

    return price;
  }

  function calculateWebsitePrice() {
    let price = 0;

    if (highlightAnimation) price += 60;
    if (filteringSorting) price += 660;
    if (languages > 0) price += languages * 450;
    if (heroAnimation === "time_lapse") price += 1200;
    else if (heroAnimation === "close_up") price += 600;

    return price;
  }

  function calculateApartmentsPrice() {
    if (!needsApartmentModels) return 0;

    let price = 300; // Base 3D representation cost
    price += overallApartments * 15;
    price += uniqueApartments * 300;
    price += averageRooms * 300;

    return price;
  }

  const stepPrices = {
    buildings: calculateBuildingsPrice(),
    apartments: calculateApartmentsPrice(),
    environment: calculateEnvironmentPrice(),
    website: calculateWebsitePrice(),
  };

  const steps = [
    { label: "BUILDINGS", sectionId: "buildings", price: stepPrices.buildings },
    {
      label: "APARTMENTS",
      sectionId: "apartments",
      price: stepPrices.apartments,
    },
    {
      label: "ENVIRONMENT",
      sectionId: "environment",
      price: stepPrices.environment,
    },
    { label: "WEBSITE", sectionId: "website", price: stepPrices.website },
  ];

  // Determine the active index
  const activeIndex = steps.findIndex(
    (step) => step.sectionId === activeSection
  );

  // Function to determine if a step is completed (comes before active step)
  const isStepCompleted = (index: number) => {
    if (activeIndex === -1) return false;
    return index < activeIndex;
  };

  // Function to get line style between steps
  const getLineStyle = (index: number) => {
    // If this is the line after the active step and we have progress
    if (progress && index === activeIndex) {
      return `bg-gradient-to-r from-white/50 to-white/${Math.round(
        10 + 40 * progress.ratio
      )}`;
    }

    // If this line comes before the active step
    if (index < activeIndex) {
      return "bg-white/50";
    }

    // Default line style
    return "bg-white/10";
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm px-6 h-32 w-full sticky top-15 sm:top-20 z-10">
      <div className="h-full max-w-4xl mx-auto flex items-center justify-between relative">
        {steps.map((step, index, array) => (
          <div
            key={step.label}
            className="flex-1 flex flex-col items-center relative space-y-3 cursor-pointer"
            onClick={() => onStepClick(step.sectionId)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              onStepClick(step.sectionId)
            }
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${step.label.toLowerCase()} section`}
          >
            {/* Line to next dot */}
            {index < array.length - 1 && (
              <div
                className={twMerge(
                  "absolute top-[5px] left-[calc(50%+5px)] right-[calc(-60%+29px)] h-0.5 z-0 transition-all duration-200",
                  getLineStyle(index)
                )}
              />
            )}

            {/* Dot */}
            <div
              className={twMerge(
                "z-10 w-3 h-3 rounded-full transition-all duration-200",
                activeSection === step.sectionId
                  ? "bg-white scale-125"
                  : isStepCompleted(index)
                  ? "bg-white/50"
                  : "bg-white/20"
              )}
            />

            {/* Label + Price */}
            <div className="hidden sm:flex items-center gap-2">
              <p
                className={twMerge(
                  "text-xs font-medium tracking-wide",
                  activeSection === step.sectionId
                    ? "text-white"
                    : isStepCompleted(index)
                    ? "text-white/70"
                    : "text-white/50"
                )}
              >
                {step.label}
              </p>
            </div>
            <span
              className={twMerge(
                "text-[13px] font-normal",
                activeSection === step.sectionId
                  ? "text-white"
                  : isStepCompleted(index)
                  ? "text-white/60"
                  : "text-white/40"
              )}
            >
              {step.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingStep;
