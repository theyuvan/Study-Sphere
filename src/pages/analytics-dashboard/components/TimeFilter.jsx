import React, { useState } from 'react'
import { Calendar, Clock, Filter } from 'lucide-react'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import { cn } from '../../utils/cn'

const TimeFilter = ({ 
  onFilterChange, 
  selectedPeriod = 'week',
  selectedSubject = 'all',
  customDateRange = null 
}) => {
  const [isCustomRange, setIsCustomRange] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const timePeriods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ]

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'programming', label: 'Programming' },
    { value: 'languages', label: 'Languages' }
  ]

  const handlePeriodChange = (period) => {
    if (period === 'custom') {
      setIsCustomRange(true)
    } else {
      setIsCustomRange(false)
      onFilterChange?.({
        period,
        subject: selectedSubject,
        dateRange: null
      })
    }
  }

  const handleSubjectChange = (subject) => {
    onFilterChange?.({
      period: selectedPeriod,
      subject,
      dateRange: isCustomRange ? { start: startDate, end: endDate } : null
    })
  }

  const handleCustomRangeApply = () => {
    if (startDate && endDate) {
      onFilterChange?.({
        period: 'custom',
        subject: selectedSubject,
        dateRange: { start: startDate, end: endDate }
      })
    }
  }

  const handleReset = () => {
    setIsCustomRange(false)
    setStartDate('')
    setEndDate('')
    onFilterChange?.({
      period: 'week',
      subject: 'all',
      dateRange: null
    })
  }

  const getDateRangeDisplay = () => {
    const now = new Date()
    
    switch (selectedPeriod) {
      case 'today':
        return now.toLocaleDateString()
      case 'week':
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        return `${monthStart.toLocaleDateString()} - ${monthEnd.toLocaleDateString()}`
      case 'custom':
        if (startDate && endDate) {
          return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
        }
        return 'Select date range'
      default:
        return ''
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700"
        >
          Reset
        </Button>
      </div>

      {/* Time Period Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timePeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => handlePeriodChange(period.value)}
                className={cn(
                  'px-3 py-2 text-sm border rounded-md transition-colors',
                  (selectedPeriod === period.value || (isCustomRange && period.value === 'custom'))
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Range */}
        {isCustomRange && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button
              onClick={handleCustomRangeApply}
              disabled={!startDate || !endDate}
              size="sm"
              className="w-full"
            >
              Apply Date Range
            </Button>
          </div>
        )}

        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <Select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Current Selection Display */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{getDateRangeDisplay()}</span>
          </div>
          {selectedSubject !== 'all' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <Clock className="h-4 w-4" />
              <span>{subjects.find(s => s.value === selectedSubject)?.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TimeFilter