import React, { useState } from "react";
import { RecipeStep } from "../typings/api";

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
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Descrição do passo"
            value={step.description}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
      >
        Adicionar Passo
      </button>
    </div>
  );
};
