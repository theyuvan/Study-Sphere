import React from 'react';
import Button from '../../../components/ui/Button';

const TimeFilter = ({ activeFilter, onFilterChange, filters }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters?.map((filter) => (
        <Button
          key={filter?.value}
          variant={activeFilter === filter?.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter?.value)}
          className="transition-all duration-200"
        >
          {filter?.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeFilter;