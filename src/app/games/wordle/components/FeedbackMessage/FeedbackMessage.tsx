import { useWordleContext } from "../../context/useWordleContext";

const FeedbackMessage = () => {
  const { feedback } = useWordleContext();

  if (!feedback.on) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl shadow-md text-white transition-all duration-300 ${
        feedback.type === "error" ? "bg-red-500" : "bg-green-600"
      }`}
    >
      {feedback.message}
    </div>
  );
};

export default FeedbackMessage;
