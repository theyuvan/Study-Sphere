import React from 'react'
import { BarChart3, TrendingUp } from 'lucide-react'

// Mock chart component since we don't have a charting library
const ProgressChart = ({ 
  title = "Learning Progress", 
  data = [], 
  type = "bar",
  loading = false,
  height = 300 
}) => {
  // Sample data for demonstration
  const sampleData = [
    { label: 'Week 1', value: 65, color: '#3b82f6' },
    { label: 'Week 2', value: 78, color: '#10b981' },
    { label: 'Week 3', value: 85, color: '#8b5cf6' },
    { label: 'Week 4', value: 92, color: '#f59e0b' },
  ]

  const chartData = data.length > 0 ? data : sampleData
  const maxValue = Math.max(...chartData.map(d => d.value))

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {type === 'bar' && (
        <div className="space-y-4" style={{ height }}>
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-16 text-sm text-gray-600 font-medium">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
              <div className="w-12 text-sm text-gray-900 font-semibold text-right">
                {item.value}%
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'line' && (
        <div className="relative" style={{ height }}>
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={`${100 - y}%`}
                x2="100%"
                y2={`${100 - y}%`}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Line path */}
            <polyline
              points={chartData
                .map((item, index) => 
                  `${(index / (chartData.length - 1)) * 100},${100 - item.value}`
                )
                .join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {chartData.map((item, index) => (
              <circle
                key={index}
                cx={`${(index / (chartData.length - 1)) * 100}%`}
                cy={`${100 - item.value}%`}
                r="4"
                fill={item.color}
                className="hover:r-6 transition-all cursor-pointer"
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {chartData.map((item, index) => (
              <span key={index} className="text-xs text-gray-500">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Average: {Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length)}%
          </span>
          <span className="text-green-600 font-medium">
            +{chartData[chartData.length - 1]?.value - chartData[0]?.value}% from start
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressChart