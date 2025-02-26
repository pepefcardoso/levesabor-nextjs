import React, { useState, useEffect } from "react";
import { RecipeIngredient, RecipeUnit } from "../typings/api";
import { getRecipeUnits } from "../services/recipeUnitService";

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
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
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
          <input
            type="text"
            placeholder="Nome"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            value={ingredient.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Quantidade"
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            value={ingredient.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", e.target.valueAsNumber)
            }
            disabled={isLoading}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            value={ingredient.unit_id}
            onChange={(e) => handleChange(index, "unit_id", e.target.value)}
            disabled={isLoading}
          >
            <option value="">Selecione</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        type="button"
        onClick={addIngredient}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        Adicionar Ingrediente
      </button>
    </div>
  );
};
