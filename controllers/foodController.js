const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItem");

exports.searchFood = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);

  const regex = new RegExp(query, "i");
  const foods = await FoodItem.find({ food_name: regex }).select("food_name");

  res.json(foods);
};

exports.getFood = async (req, res) => {
  const { id } = req.params;
  const food = await FoodItem.findById(id);

  if (!food) {
    return res.status(404).json({ message: "Food item not found" });
  }

  res.json({
    name: food.food_name,
    base: {
      energy_kj: food.energy_kj,
      energy_kcal: food.energy_kcal,
      carb_g: food.carb_g,
      protein_g: food.protein_g,
      fat_g: food.fat_g,
      freesugar_g: food.freesugar_g,
      fibre_g: food.fibre_g,
      sfa_mg: food.sfa_mg,
      mufa_mg: food.mufa_mg,
      pufa_mg: food.pufa_mg,
      cholesterol_mg: food.cholesterol_mg,
      calcium_mg: food.calcium_mg,
      phosphorus_mg: food.phosphorus_mg,
      magnesium_mg: food.magnesium_mg,
      sodium_mg: food.sodium_mg,
      potassium_mg: food.potassium_mg,
      iron_mg: food.iron_mg,
      copper_mg: food.copper_mg,
      selenium_ug: food.selenium_ug,
      chromium_mg: food.chromium_mg,
      manganese_mg: food.manganese_mg,
      molybdenum_mg: food.molybdenum_mg,
      zinc_mg: food.zinc_mg,
      vita_ug: food.vita_ug,
      vite_mg: food.vite_mg,
      vitd2_ug: food.vitd2_ug,
      vitd3_ug: food.vitd3_ug,
      vitk1_ug: food.vitk1_ug,
      vitk2_ug: food.vitk2_ug,
      folate_ug: food.folate_ug,
      vitb1_mg: food.vitb1_mg,
      vitb2_mg: food.vitb2_mg,
      vitb3_mg: food.vitb3_mg,
      vitb5_mg: food.vitb5_mg,
      vitb6_mg: food.vitb6_mg,
      vitb7_ug: food.vitb7_ug,
      vitb9_ug: food.vitb9_ug,
      vitc_mg: food.vitc_mg,
      carotenoids_ug: food.carotenoids_ug,
    },
    unit: food.servings_unit,
    serving: {
      energy_kj: food.unit_serving_energy_kj,
      energy_kcal: food.unit_serving_energy_kcal,
      carb_g: food.unit_serving_carb_g,
      protein_g: food.unit_serving_protein_g,
      fat_g: food.unit_serving_fat_g,
      freesugar_g: food.unit_serving_freesugar_g,
      fibre_g: food.unit_serving_fibre_g,
      sfa_mg: food.unit_serving_sfa_mg,
      mufa_mg: food.unit_serving_mufa_mg,
      pufa_mg: food.unit_serving_pufa_mg,
      cholesterol_mg: food.unit_serving_cholesterol_mg,
      calcium_mg: food.unit_serving_calcium_mg,
      phosphorus_mg: food.unit_serving_phosphorus_mg,
      magnesium_mg: food.unit_serving_magnesium_mg,
      sodium_mg: food.unit_serving_sodium_mg,
      potassium_mg: food.unit_serving_potassium_mg,
      iron_mg: food.unit_serving_iron_mg,
      copper_mg: food.unit_serving_copper_mg,
      selenium_ug: food.unit_serving_selenium_ug,
      chromium_mg: food.unit_serving_chromium_mg,
      manganese_mg: food.unit_serving_manganese_mg,
      molybdenum_mg: food.unit_serving_molybdenum_mg,
      zinc_mg: food.unit_serving_zinc_mg,
      vita_ug: food.unit_serving_vita_ug,
      vite_mg: food.unit_serving_vite_mg,
      vitd2_ug: food.unit_serving_vitd2_ug,
      vitd3_ug: food.unit_serving_vitd3_ug,
      vitk1_ug: food.unit_serving_vitk1_ug,
      vitk2_ug: food.unit_serving_vitk2_ug,
      folate_ug: food.unit_serving_folate_ug,
      vitb1_mg: food.unit_serving_vitb1_mg,
      vitb2_mg: food.unit_serving_vitb2_mg,
      vitb3_mg: food.unit_serving_vitb3_mg,
      vitb5_mg: food.unit_serving_vitb5_mg,
      vitb6_mg: food.unit_serving_vitb6_mg,
      vitb7_ug: food.unit_serving_vitb7_ug,
      vitb9_ug: food.unit_serving_vitb9_ug,
      vitc_mg: food.unit_serving_vitc_mg,
      carotenoids_ug: food.unit_serving_carotenoids_ug,
    },
  });
};
