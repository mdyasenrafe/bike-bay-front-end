enum TextVariants {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
  P5 = "P5",
  P6 = "P6",
  Body = "Body",
}

export const TextStyles: Record<TextVariants, string> = {
  [TextVariants.H1]:
    "lg:text-5xl font-bold text-gray-900 dark:text-white font-figtree leading text-4xl",
  [TextVariants.H2]:
    "text-4xl font-bold text-gray-900 dark:text-white font-figtree",
  [TextVariants.H3]:
    "text-2xl font-bold text-gray-900 dark:text-white font-figtree",
  [TextVariants.H4]:
    "text-xl font-semibold text-gray-900 dark:text-white font-figtree",
  [TextVariants.H5]:
    "text-lg font-medium text-gray-900 dark:text-white font-figtree",
  [TextVariants.H6]:
    "text-base font-medium text-gray-900 dark:text-white font-figtree",
  [TextVariants.P1]:
    "text-lg font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.P2]:
    "text-base font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.P3]:
    "text-md font-normal text-gray-900 dark:text-white font-poppins",
  [TextVariants.P4]:
    "text-sm font-normal text-gray-800 dark:text-white font-poppins",
  [TextVariants.P5]: "text-xs text-gray-700 dark:text-white font-poppins",
  [TextVariants.P6]: "text-xs text-gray-600 dark:text-white font-poppins",
  [TextVariants.Body]:
    "text-base font-normal text-gray-900 dark:text-white font-poppins",
};

export type TextVariant = keyof typeof TextVariants;
