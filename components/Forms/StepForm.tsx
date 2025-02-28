import React, { useState } from "react";
import { RecipeStep } from "../../typings/recipe";
import CustomBackgroundTextButton from "../Buttons/CustomBackgroundTextButton";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";

interface StepFormProps {
  onStepsChange: (steps: RecipeStep[]) => void;
  initialSteps?: RecipeStep[];
}

export const StepForm = ({
  onStepsChange,
  initialSteps = [],
}: StepFormProps) => {
  const [steps, setSteps] = useState<RecipeStep[]>(initialSteps);

  const addStep = () => {
    setSteps([
      ...steps,
      { id: "", order: steps.length + 1, description: "", recipe_id: "" },
    ]);
  };

  const handleChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index].description = value;
    setSteps(newSteps);
    onStepsChange(newSteps);
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <span className="block font-medium mb-2 text-gray-700">
            Passo {step.order}
          </span>
          <CustomTextAreaInput
            value={step.description}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Descrição do passo"
            className="w-full"
          />
        </div>
      ))}
      <CustomBackgroundTextButton
        type="button"
        text="Adicionar Passo"
        backgroundColor="bg-blue-500"
        fontColor="text-white"
        onClick={addStep}
        className="w-full sm:w-auto"
      />
    </div>
  );
};