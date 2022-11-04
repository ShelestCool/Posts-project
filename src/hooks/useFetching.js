import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoasding] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoasding(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoasding(false);
    }
  };
  return [fetching, isLoading, error];
};
