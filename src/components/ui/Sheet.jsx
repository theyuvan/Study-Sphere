import React from 'react'
import { cn } from '../../utils/cn'

const Sheet = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const SheetTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
SheetTrigger.displayName = 'SheetTrigger'

const SheetContent = React.forwardRef(({ 
  className, 
  side = 'right',
  children,
  onClose,
  ...props 
}, ref) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div
        ref={ref}
        className={cn(
          "relative z-10 h-full bg-white border-4 border-black shadow-brutal-lg",
          side === 'left' ? 'w-80 mr-auto' : 'w-80 ml-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
SheetContent.displayName = 'SheetContent'

export { Sheet, SheetTrigger, SheetContent }