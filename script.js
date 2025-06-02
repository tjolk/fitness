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

document.addEventListener('DOMContentLoaded', function() {
  function makeEditable(selector) {
    document.querySelectorAll(selector).forEach(function(cell) {
      cell.addEventListener('click', function() {
        if (cell.querySelector('input')) return;
        const currentValue = cell.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.style.width = Math.max(3, currentValue.length) + 'em';
        cell.textContent = '';
        cell.appendChild(input);
        input.focus();
        input.select();
        input.addEventListener('blur', function() {
          cell.textContent = input.value;
        });
        input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === 'Escape') {
            input.blur();
          }
        });
      });
    });
  }
  makeEditable('#kracht-table td.editable');
  makeEditable('#kracht-table td.editable-weight');
  makeEditable('#kracht-table td:nth-child(4)'); // Herhalingen column
});
