import { useState, useEffect } from 'react';

const useRecommendations = (category, currentProductId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!category || !currentProductId) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/recommendations/${category}/${currentProductId}`
        );
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, currentProductId]);

  return { recommendations, loading, error };
};

export default useRecommendations;