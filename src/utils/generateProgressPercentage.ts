interface IGenerateProgressPercentage {
  amount: number;
  completed: number;
}

export function generateProgressPercentage({ amount, completed }: IGenerateProgressPercentage) {
  const calculatedPercentage = Math.round((completed / amount) * 100);

  return calculatedPercentage;
}