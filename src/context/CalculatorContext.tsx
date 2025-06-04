// src/context/CalculatorContext.tsx
import React, { createContext, useContext, useState, useMemo } from "react";

interface CalculatorContextType {
  // Buildings section
  selectedInvestment: string | null;
  setSelectedInvestment: (value: string | null) => void;
  hasBuildingModels: boolean | null;
  setHasBuildingModels: (value: boolean | null) => void;
  amenities: boolean;
  setAmenities: (value: boolean) => void;
  overallBuildings: number;
  setOverallBuildings: (value: number) => void;
  uniqueBuildings: number;
  setUniqueBuildings: (value: number) => void;
  documentationType: string | null;
  setDocumentationType: (value: string | null) => void;

  // Apartments section
  needsApartmentModels: boolean | null;
  setNeedsApartmentModels: (value: boolean | null) => void;
  overallApartments: number;
  setOverallApartments: (value: number) => void;
  uniqueApartments: number;
  setUniqueApartments: (value: number) => void;
  averageRooms: number;
  setAverageRooms: (value: number) => void;

  // Environment section
  hasEnvironmentModel: boolean | null;
  setHasEnvironmentModel: (value: boolean | null) => void;
  plotDetail: string | null;
  setPlotDetail: (value: string | null) => void;
  fileFormat: string | null;
  setFileFormat: (value: string | null) => void;
  neighborhoodDetail: string | null;
  setNeighborhoodDetail: (value: string | null) => void;

  // Website section
  highlightAnimation: boolean;
  setHighlightAnimation: (value: boolean) => void;
  filteringSorting: boolean;
  setFilteringSorting: (value: boolean) => void;
  languages: number;
  setLanguages: (value: number) => void;
  heroAnimation: string | null;
  setHeroAnimation: (value: string | null) => void;

  // Calculated values
  totalPrice: number;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Buildings section
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(
    null
  );
  const [hasBuildingModels, setHasBuildingModels] = useState<boolean | null>(
    null
  );
  const [amenities, setAmenities] = useState(false);
  const [overallBuildings, setOverallBuildings] = useState(1);
  const [uniqueBuildings, setUniqueBuildings] = useState(1);
  const [documentationType, setDocumentationType] = useState<string | null>(
    null
  );

  // Apartments section
  const [needsApartmentModels, setNeedsApartmentModels] = useState<
    boolean | null
  >(null);
  const [overallApartments, setOverallApartments] = useState(1);
  const [uniqueApartments, setUniqueApartments] = useState(1);
  const [averageRooms, setAverageRooms] = useState(1);

  // Environment section
  const [hasEnvironmentModel, setHasEnvironmentModel] = useState<
    boolean | null
  >(null);
  const [plotDetail, setPlotDetail] = useState<string | null>(null);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [neighborhoodDetail, setNeighborhoodDetail] = useState<string | null>(
    null
  );

  // Website section
  const [highlightAnimation, setHighlightAnimation] = useState(false);
  const [filteringSorting, setFilteringSorting] = useState(false);
  const [languages, setLanguages] = useState(1);
  const [heroAnimation, setHeroAnimation] = useState<string | null>(null);

  // Calculate total price based on selections
  const totalPrice = useMemo(() => {
    let price = 0;

    // Buildings section calculations
    if (selectedInvestment) {
      switch (selectedInvestment) {
        case "single_house":
          price += 450;
          break;
        case "multiple_house":
          price += 375;
          break;
        case "single_apartment":
          price += 750;
          break;
        case "multiple_apartment":
          price += 750;
          break;
      }
    }

    // Documentation type
    if (documentationType === "plans_materials") {
      price += 1350;
    } else if (documentationType === "plans_visualizations") {
      price += 1050;
    }

    // Amenities
    if (amenities) {
      price += 300;
    }

    // Apartments section calculations
    if (needsApartmentModels) {
      price += 300; // 3D representations of apartments
      price += overallApartments * 15;
      price += uniqueApartments * 300;
      price += averageRooms * 300;
    }

    // Environment section calculations
    if (hasEnvironmentModel === false) {
      price += 30; // Basic creation fee
      if (plotDetail === "basic") {
        // No additional cost
      } else if (plotDetail === "grass_trees") {
        price += 630;
      } else if (plotDetail === "detailed") {
        price += 930;
      } else if (plotDetail === "photogrammetry") {
        price += 1230;
      }

      if (neighborhoodDetail === "neighborhood_basic") {
        // No additional cost
      } else if (neighborhoodDetail === "neighborhood_grass_trees") {
        price += 630;
      } else if (neighborhoodDetail === "neighborhood_detailed") {
        price += 930;
      } else if (neighborhoodDetail === "neighborhood_photogrammetry") {
        price += 1230;
      }
    }

    // Website section calculations
    if (highlightAnimation) {
      price += 60;
    }

    if (filteringSorting) {
      price += 660;
    }

    if (languages > 0) {
      price += languages * 450;
    }

    if (heroAnimation === "time_lapse") {
      price += 1200;
    } else if (heroAnimation === "close_up") {
      price += 600;
    }

    return price;
  }, [
    selectedInvestment,
    amenities,
    documentationType,
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
    neighborhoodDetail,
  ]);

  return (
    <CalculatorContext.Provider
      value={{
        // Buildings
        selectedInvestment,
        setSelectedInvestment,
        hasBuildingModels,
        setHasBuildingModels,
        amenities,
        setAmenities,
        overallBuildings,
        setOverallBuildings,
        uniqueBuildings,
        setUniqueBuildings,
        documentationType,
        setDocumentationType,

        // Apartments
        needsApartmentModels,
        setNeedsApartmentModels,
        overallApartments,
        setOverallApartments,
        uniqueApartments,
        setUniqueApartments,
        averageRooms,
        setAverageRooms,

        // Environment
        hasEnvironmentModel,
        setHasEnvironmentModel,
        plotDetail,
        setPlotDetail,
        fileFormat,
        setFileFormat,
        neighborhoodDetail,
        setNeighborhoodDetail,

        // Website
        highlightAnimation,
        setHighlightAnimation,
        filteringSorting,
        setFilteringSorting,
        languages,
        setLanguages,
        heroAnimation,
        setHeroAnimation,

        // Calculated
        totalPrice,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
};
