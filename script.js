const schedule = [
  { day: 'Monday', activity: 'Cardio & Abs' },
  { day: 'Tuesday', activity: 'Upper Body Strength' },
  { day: 'Wednesday', activity: 'Yoga or Rest' },
  { day: 'Thursday', activity: 'Lower Body Strength' },
  { day: 'Friday', activity: 'HIIT' },
  { day: 'Saturday', activity: 'Outdoor Activity' },
  { day: 'Sunday', activity: 'Rest' }
];

const scheduleSection = document.querySelector('.schedule');

schedule.forEach(({ day, activity }) => {
  const dayDiv = document.createElement('div');
  dayDiv.className = 'day';
  dayDiv.innerHTML = `<span class="day-name">${day}</span><span>${activity}</span>`;
  scheduleSection.appendChild(dayDiv);
});
