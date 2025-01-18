export function formatDate(dateStr: string): string {
  if (dateStr === 'Present') {
    return 'Present';
  }
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'short'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}