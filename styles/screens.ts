const screenSize = {
  small: 500,
  medium: 800,
  large: 1200,
};

export default {
  small: `@media (max-width: ${screenSize.small}px)`,
  medium: `@media (max-width: ${screenSize.medium}px)`,
  large: `@media (max-width: ${screenSize.large}px)`,
};
