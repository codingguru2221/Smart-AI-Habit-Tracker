export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const dateToCheck = new Date(date);
  return dateToCheck.toDateString() === today.toDateString();
};

export const isYesterday = (date) => {
  if (!date) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateToCheck = new Date(date);
  return dateToCheck.toDateString() === yesterday.toDateString();
};

export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const dateToCheck = new Date(date);
  const diffInHours = Math.floor((now - dateToCheck) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - dateToCheck) / (1000 * 60));
    return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
  }
  
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
};