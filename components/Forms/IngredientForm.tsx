import React, { useState, useEffect } from "react";
import { getRecipeUnits } from "../../services/recipeUnitService";
import { RecipeIngredient, RecipeUnit } from "../../typings/recipe";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledButton from "../Buttons/FilledButton";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import toast from "react-hot-toast";

interface IngredientFormProps {
  onIngredientsChange: (ingredients: RecipeIngredient[]) => void;
  initialIngredients?: RecipeIngredient[];
}

export const IngredientForm = ({
  onIngredientsChange,
  initialIngredients = [],
}: IngredientFormProps) => {
  const [units, setUnits] = useState<RecipeUnit[]>([]);
  const [ingredients, setIngredients] =
    useState<RecipeIngredient[]>(initialIngredients);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await getRecipeUnits({
          pagination: { page: 1, per_page: 50 },
        });
        setUnits(response.data);
      } catch {
        toast.error("Erro ao carregar unidades de medida");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: "", quantity: 0, name: "", unit_id: "", recipe_id: "" },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof RecipeIngredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value as never;
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
        <span>Nome do Ingrediente</span>
        <span>Quantidade</span>
        <span>Unidade</span>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-center">
          <CustomTextInput
            type={InputType.Text}
            placeholder="Nome"
            value={ingredient.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            disabled={isLoading}
            className="w-full"
          />

          <CustomTextInput
            type={InputType.Number}
            placeholder="Quantidade"
            value={ingredient.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", e.target.valueAsNumber)
            }
            disabled={isLoading}
            className="w-full"
          />

          <CustomInputSelect
            options={units.map(unit => ({
              value: unit.id,
              label: unit.name
            }))}
            value={ingredient.unit_id}
            onChange={(e) => handleChange(index, "unit_id", e.target.value)}
            placeholder="Selecione"
            disabled={isLoading}
            className="w-full"
          />
        </div>
      ))}

      <FilledButton
        text="Adicionar Ingrediente"
        color="bg-blue-500"
        fontColor="text-white"
        onClick={addIngredient}
        disabled={isLoading}
        className="w-full"
      />
    </div>
  );
};