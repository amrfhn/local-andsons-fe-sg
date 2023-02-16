/* eslint-disable prettier/prettier */

const hrefMap = {
  1: "/treatment/hair-loss",
  2: "/treatment/sexual-health",
  3: "/treatment/skincare",
  4: "/mental-health",
  5: "/treatment/supplements",
};

// const getCategories = categoryId => {
//   return categories[categoryId];
// };

// const getCategoryId = categorySlug => {
//   return Object.keys(categories).find(key => categories[key] === categorySlug);
// };

const isPrescriptionBased = (value) => {
  return value ? "Prescription product" : "Non-prescription product";
};

module.exports = {
  isPrescriptionBased,
  hrefMap,
  // getCategories,
  // getCategoryId
};
