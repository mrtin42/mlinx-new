'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) {
  const { pending } = useFormStatus()
 
  return (
    <button disabled={pending} type="submit" className={className}>
      {pending ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        children || 'Submit'
      )}
    </button>
  )
}