import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'

const MetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue,
  icon: Icon,
  color = 'primary',
  loading = false 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-600',
      value: 'text-primary-900'
    },
    success: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      value: 'text-green-900'
    },
    warning: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      value: 'text-yellow-900'
    },
    danger: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      value: 'text-red-900'
    },
    info: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      value: 'text-blue-900'
    }
  }

  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp
    if (trend === 'down') return TrendingDown
    return Minus
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500'
    if (trend === 'down') return 'text-red-500'
    return 'text-gray-400'
  }

  const TrendIcon = getTrendIcon()
  const classes = colorClasses[color]

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {Icon && (
          <div className={cn('p-2 rounded-lg', classes.bg)}>
            <Icon className={cn('h-4 w-4', classes.icon)} />
          </div>
        )}
      </div>

      <div className="mb-2">
        <p className={cn('text-2xl font-bold', classes.value)}>
          {value}
        </p>
      </div>

      <div className="flex items-center justify-between">
        {subtitle && (
          <p className="text-sm text-gray-600">{subtitle}</p>
        )}
        
        {trendValue && (
          <div className="flex items-center space-x-1">
            <TrendIcon className={cn('h-4 w-4', getTrendColor())} />
            <span className={cn('text-sm font-medium', getTrendColor())}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricsCard