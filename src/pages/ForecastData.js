// forecastData.js

// Generate random forecast data for prediction
export const generateForecastData = () => {
    // Simulate claim data for the last 7 days
    const predictedClaims = [];
    const peakHour = Math.floor(Math.random() * 24); // Random peak hour
    for (let i = 0; i < 7; i++) {
      predictedClaims.push({
        day: `Day ${i + 1}`,
        claimAmount: Math.round(Math.random() * 10000 + 1000), // Random claim amount
        numClaims: Math.floor(Math.random() * 50 + 10), // Random number of claims
      });
    }
  
    // Calculate total predicted claims
    const totalPredictedClaims = predictedClaims.reduce((total, item) => total + item.claimAmount, 0);
  
    return { predictedClaims, totalPredictedClaims, peakHour };
  };
  