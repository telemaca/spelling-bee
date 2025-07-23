const getFeedbackColor = (feedbackType: string) => {
  switch (feedbackType) {
    case "success":
      return "bg-green-500 grow-in";
    case "error":
      return "bg-red-500";
    case "existing":
      return "bg-orange-400";
    case "short":
      return "bg-gray-500";
  }
};

export default getFeedbackColor;
