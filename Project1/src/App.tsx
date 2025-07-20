import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, DollarSign, Briefcase, GraduationCap, MapPin, Star } from 'lucide-react';
import EmployeeForm from './components/EmployeeForm';
import PredictionResults from './components/PredictionResults';
import { EmployeeData, PredictionResult } from './types/employee';
import { predictSalary } from './utils/salaryPredictor';

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (data: EmployeeData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = predictSalary(data);
    setPrediction(result);
    setIsLoading(false);
  };

  const resetPrediction = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SalaryPredict AI</h1>
                <p className="text-sm text-gray-600">Intelligent Salary Prediction System</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>50K+ Predictions</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>95% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!prediction ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Predict Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Market Salary</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get accurate salary predictions based on your experience, skills, education, and market data. 
                Our AI analyzes thousands of data points to provide you with precise compensation insights.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Experience Analysis</h3>
                <p className="text-sm text-gray-600">Years of experience and career progression</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Education Impact</h3>
                <p className="text-sm text-gray-600">Degree level and field of study</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location Factor</h3>
                <p className="text-sm text-gray-600">Cost of living and market rates</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Skills Premium</h3>
                <p className="text-sm text-gray-600">Technology stack and certifications</p>
              </div>
            </div>

            {/* Form */}
            <EmployeeForm onSubmit={handlePrediction} isLoading={isLoading} />
          </div>
        ) : (
          <PredictionResults result={prediction} onReset={resetPrediction} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 SalaryPredict AI. Empowering career decisions with data-driven insights.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;