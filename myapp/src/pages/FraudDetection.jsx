import React from 'react';

const Features = () => {
  const features = [
    { title: 'Callback Scheduling', description: 'Automate follow-ups and prioritize tasks.' },
    { title: 'Sentiment Analysis', description: 'Real-time insights into customer mood.' },
    { title: 'Claim Forecasting', description: 'Predict trends and optimize resources.' },
    { title: 'Voice-Activated Assistant', description: 'Quick access to information during calls.' },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-3xl font-bold text-center text-primary">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="p-4 bg-white shadow-lg">
            <h2 className="text-xl font-bold">{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
