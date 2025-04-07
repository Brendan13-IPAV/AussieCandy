import React, { useState, useEffect } from 'react';

const AussieCandyHybridFinder = () => {
  // State for our data
  const [booleanQuestions, setBooleanQuestions] = useState([]);
  const [spectrumQuestions, setSpectrumQuestions] = useState([]);
  const [candies, setCandies] = useState([]);
  const [checkboxSelections, setCheckboxSelections] = useState({});
  const [sliderValues, setSliderValues] = useState({});
  const [rankedCandies, setRankedCandies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colors for our theme
  const colors = {
    teal: '#008080',
    lightTeal: '#66b2b2',
    darkGrey: '#333333',
    mediumGrey: '#666666',
    lightGrey: '#e0e0e0',
    white: '#ffffff'
  };

  // Define which questions are boolean and which are spectrum
  const questionTypes = {
    boolean: [
      "Do you need biscuits?",
      "Something with crumbs?",
      "Shaped like an animal?",
      "Do you like floral Flavors?",
      "Can you accept something powdered?"
    ],
    spectrum: [
      "Do you want chocolate",
      "Do you like chewy things",
      "Something with caramel"
    ]
  };

  // Hardcoded data
  const candyData = {
    candies: [
      {
        name: "Cherry Ripe",
        description: "chocolate-covered cherry coconut bar",
        scores: {
          "Do you want chocolate": 1,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Fantales",
        description: "chocolate-covered caramel with trivia wrapper",
        scores: {
          "Do you want chocolate": 1,
          "Do you like chewy things": 1,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 1
        }
      },
      {
        name: "Violet Crumble",
        description: "honeycomb toffee covered in chocolate",
        scores: {
          "Do you want chocolate": 1,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 1,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Minties",
        description: "chewy peppermint-flavored candy",
        scores: {
          "Do you want chocolate": 0,
          "Do you like chewy things": 3,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Caramello Koala",
        description: "chocolate koala filled with caramel",
        scores: {
          "Do you want chocolate": 2,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 1,
          "Something with caramel": 2
        }
      },
      {
        name: "Freckles",
        description: "chocolate discs covered in candy sprinkles",
        scores: {
          "Do you want chocolate": 2,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 1,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Fry's Turkish Delight",
        description: "rose-flavored jelly covered in chocolate",
        scores: {
          "Do you want chocolate": 1,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 1,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Redskins",
        description: "raspberry-flavored chewy candy",
        scores: {
          "Do you want chocolate": 0,
          "Do you like chewy things": 3,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Wizz Fizz",
        description: "sherbet powder candy",
        scores: {
          "Do you want chocolate": 0,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 2,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Freddo Frog",
        description: "frog-shaped chocolate",
        scores: {
          "Do you want chocolate": 3,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 1,
          "Something with caramel": 0
        }
      },
      {
        name: "Jaffas",
        description: "orange-flavored chocolate balls",
        scores: {
          "Do you want chocolate": 2,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Pollywaffles",
        description: "marshmallow and caramel wafer bar",
        scores: {
          "Do you want chocolate": 0,
          "Do you like chewy things": 0.5,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0.5,
          "Something with crumbs?": 1,
          "Shaped like an animal?": 0,
          "Something with caramel": 0.5
        }
      },
      {
        name: "Picnic",
        description: "chocolate bar with peanuts, caramel, and rice crisps",
        scores: {
          "Do you want chocolate": 1,
          "Do you like chewy things": 0.5,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0.5,
          "Something with crumbs?": 1,
          "Shaped like an animal?": 0,
          "Something with caramel": 3
        }
      },
      {
        name: "Musk Sticks",
        description: "pink, musk-flavored candy sticks",
        scores: {
          "Do you want chocolate": 0,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 1,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 0,
          "Something with crumbs?": 0,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      },
      {
        name: "Tim Tams",
        description: "chocolate-covered chocolate biscuit",
        scores: {
          "Do you want chocolate": 3,
          "Do you like chewy things": 0,
          "Do you like floral Flavors?": 0,
          "Can you accept something powdered?": 0,
          "Do you need biscuits?": 1,
          "Something with crumbs?": 1,
          "Shaped like an animal?": 0,
          "Something with caramel": 0
        }
      }
    ]
  };

  // Initialize data on component mount
  useEffect(() => {
    // Set questions by type
    setBooleanQuestions(questionTypes.boolean);
    setSpectrumQuestions(questionTypes.spectrum);
    
    // Initialize checkbox selections to all false (unchecked)
    const initialCheckboxes = {};
    questionTypes.boolean.forEach(question => {
      initialCheckboxes[question] = false;
    });
    
    // Initialize slider values to neutral (0)
    const initialSliders = {};
    questionTypes.spectrum.forEach(question => {
      initialSliders[question] = 0;
    });
    
    setCandies(candyData.candies);
    setCheckboxSelections(initialCheckboxes);
    setSliderValues(initialSliders);
    setLoading(false);
  }, []);

  // Calculate candy rankings whenever selections or slider values change
  useEffect(() => {
    if (loading) return;
    
    const rankCandies = () => {
      // Get selected checkbox questions
      const selectedBooleanQuestions = booleanQuestions.filter(q => checkboxSelections[q]);
      
      // Get non-zero slider questions
      const activeSpectrumQuestions = spectrumQuestions.filter(q => sliderValues[q] !== 0);
      
      // If no selections (checkboxes or sliders), all candies are shown with zero score
      if (selectedBooleanQuestions.length === 0 && activeSpectrumQuestions.length === 0) {
        return candies.map(candy => ({
          ...candy,
          score: 0,
          booleanMatches: [],
          booleanNonMatches: [],
          spectrumMatches: [],
          spectrumNonMatches: []
        }));
      }
      
      const ranked = candies.map(candy => {
        // Track boolean matches/non-matches
        const booleanMatches = [];
        const booleanNonMatches = [];
        let booleanScore = 0;
        
        // For each selected checkbox question, check if candy scores > 0
        selectedBooleanQuestions.forEach(question => {
          if ((candy.scores[question] || 0) > 0) {
            booleanMatches.push(question);
            booleanScore++;
          } else {
            booleanNonMatches.push(question);
          }
        });
        
        // Calculate boolean match percentage
        const booleanPercentage = selectedBooleanQuestions.length > 0 
          ? (booleanScore / selectedBooleanQuestions.length) * 100 
          : 100; // 100% if no boolean questions selected
        
        // Track spectrum matches/non-matches
        const spectrumMatches = [];
        const spectrumNonMatches = [];
        let spectrumScore = 0;
        let spectrumPossibleScore = 0;
        
        // Calculate spectrum match score
        activeSpectrumQuestions.forEach(question => {
          const candyValue = candy.scores[question] || 0;
          const preferenceValue = sliderValues[question];
          
          // Convert preference (-5 to 5) to expected score (0 to 3)
          const expectedValue = (preferenceValue > 0) 
            ? (preferenceValue / 5) * 3  // Map 1-5 to 0.6-3
            : 0;  // Negative values mean user doesn't want this
          
          // Calculate match (higher when candy matches expected value)
          const match = (preferenceValue > 0)
            ? Math.max(0, 3 - Math.abs(expectedValue - candyValue))
            : Math.max(0, 3 - candyValue);  // Reward low scores for negative preferences
          
          // Track if this is a good match
          const isGoodMatch = match > 1.5;
          
          if (isGoodMatch) {
            spectrumMatches.push(question);
          } else {
            spectrumNonMatches.push(question);
          }
          
          // Weight by strength of preference
          const weight = Math.abs(preferenceValue) / 5;
          spectrumScore += match * weight;
          spectrumPossibleScore += 3 * weight; // Max possible match is 3
        });
        
        // Calculate spectrum match percentage
        const spectrumPercentage = spectrumPossibleScore > 0 
          ? (spectrumScore / spectrumPossibleScore) * 100 
          : 100; // 100% if no spectrum questions active
        
        // Combine boolean and spectrum scores with equal weight
        const combinedScore = (booleanPercentage + spectrumPercentage) / 2;
        
        return {
          ...candy,
          score: combinedScore,
          booleanMatches,
          booleanNonMatches,
          spectrumMatches,
          spectrumNonMatches
        };
      });
      
      // Sort by score (descending)
      return ranked.sort((a, b) => b.score - a.score);
    };
    
    setRankedCandies(rankCandies());
  }, [checkboxSelections, sliderValues, booleanQuestions, spectrumQuestions, candies, loading]);

  // Toggle a checkbox selection
  const toggleSelection = (question) => {
    setCheckboxSelections({
      ...checkboxSelections,
      [question]: !checkboxSelections[question]
    });
  };
  
  // Update a slider value
  const updateSliderValue = (question, value) => {
    setSliderValues({
      ...sliderValues,
      [question]: value
    });
  };

  // Return loading screen if data not ready
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Sort boolean questions to put selected ones at the top
  const sortedBooleanQuestions = [...booleanQuestions].sort((a, b) => {
    if (checkboxSelections[a] && !checkboxSelections[b]) return -1;
    if (!checkboxSelections[a] && checkboxSelections[b]) return 1;
    return 0;
  });

  // Helper function to get the preference text label for sliders
  const getPreferenceLabel = (value) => {
    if (value === 0) return "Neutral";
    if (value > 0) {
      return value < 3 ? "Yes" : value < 5 ? "Strongly Yes" : "Definitely Yes";
    } else {
      return value > -3 ? "No" : value > -5 ? "Strongly No" : "Definitely No";
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-100 min-h-screen" style={{ color: colors.darkGrey }}>
      <h1 className="text-3xl font-bold mb-6" style={{ color: colors.teal }}>Aussie Candy Finder</h1>
      
      <div className="flex flex-row gap-6">
        {/* Left column - preferences */}
        <div className="w-1/2 space-y-4">
          {/* Boolean Questions (Checkboxes) */}
          <div className="bg-white p-4 rounded-lg shadow" style={{ backgroundColor: colors.white }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.teal }}>
              Simple Preferences
            </h2>
            
            <div className="space-y-1">
              {sortedBooleanQuestions.map((question, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded transition-all duration-200 ${checkboxSelections[question] ? 'bg-teal-50 border-l-4 border-teal-500' : 'hover:bg-gray-50'}`}
                  style={{ 
                    borderLeft: checkboxSelections[question] ? `4px solid ${colors.teal}` : '4px solid transparent'
                  }}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkboxSelections[question]}
                      onChange={() => toggleSelection(question)}
                      className="h-4 w-4 rounded"
                      style={{ accentColor: colors.teal }}
                    />
                    <span className="ml-2 font-medium" style={{ color: checkboxSelections[question] ? colors.teal : colors.darkGrey }}>
                      {question}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Spectrum Questions (Sliders) */}
          <div className="bg-white p-4 rounded-lg shadow" style={{ backgroundColor: colors.white }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.teal }}>
              Preference Strength
            </h2>
            
            {spectrumQuestions.map((question, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium">{question}</label>
                  <span className="text-sm font-medium" style={{ 
                    color: sliderValues[question] === 0 
                      ? colors.mediumGrey 
                      : sliderValues[question] > 0 
                        ? colors.teal 
                        : colors.darkGrey 
                  }}>
                    {getPreferenceLabel(sliderValues[question])}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Strongly Dislike</span>
                    <span>Neutral</span>
                    <span>Strongly Like</span>
                  </div>
                  
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={sliderValues[question]}
                    onChange={(e) => updateSliderValue(question, parseInt(e.target.value))}
                    className="w-full"
                    style={{
                      accentColor: colors.teal,
                      height: '8px',
                      borderRadius: '4px'
                    }}
                  />
                  
                  <div className="w-full flex relative">
                    <div className="absolute left-0 w-full flex justify-between px-1">
                      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(tick => (
                        <div 
                          key={tick} 
                          className="h-2 w-px bg-gray-300"
                          style={{
                            backgroundColor: tick === 0 ? colors.mediumGrey : colors.lightGrey
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column - results */}
        <div className="w-1/2">
          <div className="bg-white p-4 rounded-lg shadow h-full" style={{ backgroundColor: colors.white }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.teal }}>
              Recommended Candies
            </h2>
            
            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
              {rankedCandies.filter(candy => candy.score > 0).map((candy, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg border transition-all"
                  style={{ 
                    borderLeft: `4px solid ${colors.teal}`,
                    opacity: Math.min(1, candy.score / 50 + 0.6) // Fade out lower scores, but not completely
                  }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{candy.name}</h3>
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                      {Math.round(candy.score)}%
                    </span>
                  </div>
                  
                  <p className="text-xs mb-2" style={{ color: colors.mediumGrey }}>{candy.description}</p>
                  
                  {/* Display matches and non-matches */}
                  <div className="mt-2 space-y-1">
                    {/* Boolean matches */}
                    {candy.booleanMatches.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-green-600">Features:</span>
                        <span className="ml-1 text-green-600">{candy.booleanMatches.join(', ')}</span>
                      </div>
                    )}
                    
                    {/* Boolean non-matches */}
                    {candy.booleanNonMatches.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-red-500">Missing:</span>
                        <span className="ml-1 text-red-500">{candy.booleanNonMatches.join(', ')}</span>
                      </div>
                    )}
                    
                    {/* Spectrum matches */}
                    {candy.spectrumMatches.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-teal-600">Good match for:</span>
                        <span className="ml-1 text-teal-600">{candy.spectrumMatches.join(', ')}</span>
                      </div>
                    )}
                    
                    {/* Spectrum non-matches */}
                    {candy.spectrumNonMatches.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-orange-500">Less ideal for:</span>
                        <span className="ml-1 text-orange-500">{candy.spectrumNonMatches.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {rankedCandies.filter(candy => candy.score > 0).length === 0 && (
                <div className="text-center p-8" style={{ color: colors.mediumGrey }}>
                  {(sortedBooleanQuestions.some(q => checkboxSelections[q]) || spectrumQuestions.some(q => sliderValues[q] !== 0)) 
                    ? "No matching candies found. Try different preferences."
                    : "Select what you're looking for to get recommendations."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AussieCandyHybridFinder;
