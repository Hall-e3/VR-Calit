import { useState } from "react";
import {
  EnvironmentIcon,
  EnvironmentOneIcon,
  EnvironmentTwoIcon,
  EnvironmentThreeIcon,
  NeighborhoodIcon,
  NeighborhoodOneIcon,
  NeighborhoodTwoIcon,
  NeighborhoodThreeIcon,
} from "../../assets/icons";
import { twMerge } from "tailwind-merge";

const ApartmentType = {
  Needs: "need_models",
  Has: "has_models",
} as const;

type ApartmentType = (typeof ApartmentType)[keyof typeof ApartmentType];

type EnvironmentTypeValue =
  | "single_house"
  | "multiple_house"
  | "single_apartment"
  | "multiple_apartment";
type FileFormat =
  | "unreal_engine"
  | "3d_max_blender_corona"
  | "sketchfab_autocad"
  | null;

const environmentTypes = [
  {
    value: "single_house" as EnvironmentTypeValue,
    label: "Just basic plan & plot plan as a ground",
    icon: <EnvironmentIcon className="size-25" />,
  },
  {
    value: "multiple_house" as EnvironmentTypeValue,
    label: "Plot with grass, couple trees and basic neighborhood",
    icon: <EnvironmentOneIcon className="size-25" />,
  },
  {
    value: "single_apartment" as EnvironmentTypeValue,
    label:
      "Detailed plot with gardens, sidewalks, fences & detailed neighborhood blocks",
    icon: <EnvironmentTwoIcon className="size-25" />,
  },
  {
    value: "multiple_apartment" as EnvironmentTypeValue,
    label: "Fully detailed environment based on photogrammetry",
    icon: <EnvironmentThreeIcon className="size-25" />,
  },
];

const neighborhoodTypes = [
  {
    value: "single_house" as EnvironmentTypeValue,
    label: "Just basic plan & plot plan as a ground",
    icon: <NeighborhoodIcon className="size-25" />,
  },
  {
    value: "multiple_house" as EnvironmentTypeValue,
    label: "Plot with grass, couple trees and basic neighborhood",
    icon: <NeighborhoodOneIcon className="size-25" />,
  },
  {
    value: "single_apartment" as EnvironmentTypeValue,
    label:
      "Detailed plot with gardens, sidewalks, fences & detailed neighborhood blocks",
    icon: <NeighborhoodTwoIcon className="size-25" />,
  },
  {
    value: "multiple_apartment" as EnvironmentTypeValue,
    label: "Fully detailed environment based on photogrammetry",
    icon: <NeighborhoodThreeIcon className="size-25" />,
  },
];

const fileFormats = [
  { value: "unreal_engine" as FileFormat, label: "Building in Unreal Engine" },
  {
    value: "3d_max_blender_corona" as FileFormat,
    label: "Building in 3D Max, Blender, Corona",
  },
  { value: "sketchfab_autocad" as FileFormat, label: "Sketchfab, AutoCAD" },
];

const RadioCard = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    className={twMerge(
      "flex items-center gap-4 p-4 rounded-lg border cursor-pointer border-white/10",
      selected && "border-white/30"
    )}
    role="radio"
    aria-checked={selected}
    tabIndex={0}
  >
    <div
      className={twMerge(
        "h-5 w-5 rounded-full flex items-center justify-center",
        selected ? "bg-white" : "bg-white/10"
      )}
    >
      <div
        className={twMerge("h-2.5 w-2.5 rounded-full", selected && "bg-black")}
      />
    </div>
    <span className="text-white tracking-wide">{label}</span>
  </div>
);

const SelectableCard = ({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    className={twMerge(
      "w-full max-w-sm h-32 flex justify-center space-x-10 p-4 rounded-lg border relative cursor-pointer",
      selected
        ? "border-white/20 bg-white/10"
        : "border-white/10 hover:border-white/30"
    )}
    role="radio"
    aria-checked={selected}
    tabIndex={0}
  >
    <div
      className={twMerge(
        "absolute left-4 top-4 h-5 w-5 rounded-full flex items-center justify-center",
        selected ? "bg-white" : "bg-white/10"
      )}
    >
      <div
        className={twMerge("h-2.5 w-2.5 rounded-full", selected && "bg-black")}
      />
    </div>
    <div className="flex flex-col justify-center items-center text-center">
      {icon}
      <p className="text-sm text-white">{label}</p>
    </div>
  </div>
);

export default function EnvironmentSection() {
  const [has3DModels, setHas3DModels] = useState<ApartmentType | null>(null);
  const [fileFormat, setFileFormat] = useState<FileFormat>(null);
  const [environmentSelection, setEnvironmentSelection] =
    useState<EnvironmentTypeValue | null>(null);
  const [neighborhoodSelection, setNeighborhoodSelection] =
    useState<EnvironmentTypeValue | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        Environment
      </h1>

      {/* 3D Model Selection */}
      <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
        <h2 className="font-bold text-white text-md">
          Do you have your own environment model?
        </h2>
        <div className="space-y-2">
          <RadioCard
            label="Yes, I have my own environment model that I want to use"
            selected={has3DModels === ApartmentType.Has}
            onClick={() => {
              setHas3DModels(ApartmentType.Has);
              setEnvironmentSelection(null);
              setNeighborhoodSelection(null);
            }}
          />
          <RadioCard
            label="No, I don't have a model and I want you to create one for me"
            selected={has3DModels === ApartmentType.Needs}
            onClick={() => {
              setHas3DModels(ApartmentType.Needs);
              setFileFormat(null);
            }}
          />
        </div>
      </div>

      {/* If they have models, ask format */}
      {has3DModels === ApartmentType.Has && (
        <div className="bg-[#1c1c1c] backdrop-blur-sm p-3 sm:p-6 rounded-md space-y-4">
          <h2 className="font-bold text-white text-md">
            Select the file format used for your 3D models
          </h2>
          <div className="space-y-2">
            {fileFormats.map((option) => (
              <RadioCard
                key={option.value}
                label={option.label}
                selected={fileFormat === option.value}
                onClick={() => setFileFormat(option.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* If they don't have models, ask how detailed */}
      {has3DModels === ApartmentType.Needs && (
        <>
          <div className="bg-[#1c1c1c] backdrop-blur-sm p-4 sm:p-8 rounded-md space-y-4">
            <h2 className="font-bold text-white text-md">
              How detailed should the **plot** be?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {environmentTypes.map((item) => (
                <SelectableCard
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  selected={environmentSelection === item.value}
                  onClick={() => setEnvironmentSelection(item.value)}
                />
              ))}
            </div>
          </div>

          <div className="bg-[#1c1c1c] backdrop-blur-sm p-4 sm:p-8 rounded-md space-y-4">
            <h2 className="font-bold text-white text-md">
              How detailed should the **neighborhood** be?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neighborhoodTypes.map((item) => (
                <SelectableCard
                  key={item.value}
                  icon={item.icon}
                  label={item.label}
                  selected={neighborhoodSelection === item.value}
                  onClick={() => setNeighborhoodSelection(item.value)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
