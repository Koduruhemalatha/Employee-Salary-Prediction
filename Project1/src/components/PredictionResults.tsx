import React from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Target, BarChart3, Award, Lightbulb } from 'lucide-react';
import { PredictionResult } from '../types/employee';

interface PredictionResultsProps {
  result: PredictionResult;
  onReset: () => void;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result, onReset }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getFactorColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Form</span>
        </button>
        
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
          {result.confidence}% Confidence
        </div>
      </div>

      {/* Main Prediction Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-white/20 p-4 rounded-full">
              <DollarSign className="h-8 w-8" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold">Predicted Annual Salary</h2>
          <div className="text-6xl font-bold">
            {formatCurrency(result.predictedSalary)}
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-sm">Salary Range</div>
              <div className="font-semibold">
                {formatCurrency(result.salaryRange.min)} - {formatCurrency(result.salaryRange.max)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Factors Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Salary Factors</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(result.factors).map(([factor, score]) => (
              <div key={factor} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {factor === 'experience' ? 'Years of Experience' : 
                     factor === 'education' ? 'Education Level' :
                     factor === 'location' ? 'Geographic Location' :
                     factor === 'skills' ? 'Technical Skills' :
                     'Market Conditions'}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getFactorColor(score)}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="h-5 w-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Market Comparison</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Industry Average</div>
                <div className="text-sm text-gray-600">Similar roles in your field</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{formatCurrency(result.comparison.industry)}</div>
                <div className={`text-sm ${result.predictedSalary > result.comparison.industry ? 'text-green-600' : 'text-red-600'}`}>
                  {result.predictedSalary > result.comparison.industry ? '+' : ''}
                  {formatCurrency(result.predictedSalary - result.comparison.industry)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Location Average</div>
                <div className="text-sm text-gray-600">Your geographic area</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{formatCurrency(result.comparison.location)}</div>
                <div className={`text-sm ${result.predictedSalary > result.comparison.location ? 'text-green-600' : 'text-red-600'}`}>
                  {result.predictedSalary > result.comparison.location ? '+' : ''}
                  {formatCurrency(result.predictedSalary - result.comparison.location)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Experience Level</div>
                <div className="text-sm text-gray-600">Similar experience level</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{formatCurrency(result.comparison.experience)}</div>
                <div className={`text-sm ${result.predictedSalary > result.comparison.experience ? 'text-green-600' : 'text-red-600'}`}>
                  {result.predictedSalary > result.comparison.experience ? '+' : ''}
                  {formatCurrency(result.predictedSalary - result.comparison.experience)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">Recommendations to Increase Salary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Try Another Prediction
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Save Report</span>
          <TrendingUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PredictionResults;