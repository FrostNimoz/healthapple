const $ = (id) => document.getElementById(id);
const state = { moveGoal: 800, live: true, offset: 0 };
const heartPath = 'M0 132 L91 106 L182 122 L274 69 L365 91 L457 46 L548 76 L640 36';
const activityPath = 'M0 160 L91 126 L182 138 L274 84 L365 112 L457 28 L548 97 L640 52';

function updateMove() {
  const percent = Math.min(100, Math.round(612 / state.moveGoal * 100));
  $('moveGoalText').textContent = `${state.moveGoal} CAL`;
  $('movePercent').textContent = `${percent}%`;
  $('goalProgress').style.width = `${percent}%`;
  const remaining = Math.max(0, state.moveGoal - 612);
  $('goalCopy').textContent = remaining ? `${remaining} active calories left. A ${Math.max(8, Math.round(remaining / 8))}-minute brisk walk will get you there.` : 'Move goal achieved. Keep moving if it feels good.';
}
function updateDate(change) {
  state.offset += change;
  const date = new Date(2026, 8, 8 + state.offset);
  const isToday = state.offset === 0;
  $('dateButton').textContent = isToday ? 'TODAY · SEP 08' : date.toLocaleDateString('en-US', { month:'short', day:'2-digit' }).toUpperCase();
  $('signalTitle').textContent = isToday ? 'Your recovery is trending up.' : 'A clear view of your health day.';
}
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.nav-item.active').classList.remove('active'); button.classList.add('active');
  const labels = { heart:'Heart health', activity:'Activity focus', sleep:'Sleep & recovery', overview:'Good morning, Alex.' };
  document.querySelector('h1').textContent = labels[button.dataset.view];
}));
document.querySelectorAll('.segmented button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.segmented .selected').classList.remove('selected'); button.classList.add('selected');
  const isHeart = button.dataset.chart === 'heart';
  document.querySelector('.line').setAttribute('d', isHeart ? heartPath : activityPath);
  document.querySelector('.area').setAttribute('d', `${isHeart ? heartPath : activityPath} L640 190 L0 190Z`);
  $('chartLabel').textContent = isHeart ? 'AVERAGE HEART RATE' : 'AVERAGE ACTIVE CALORIES';
  $('chartAverage').textContent = isHeart ? '64 BPM' : '587 CAL';
}));
$('settingsButton').addEventListener('click', () => $('settingsDialog').showModal());
$('saveSettings').addEventListener('click', () => { state.moveGoal = Number($('moveGoalInput').value) || 800; state.live = $('liveToggle').checked; updateMove(); document.querySelector('.status.live').textContent = state.live ? 'LIVE' : 'PAUSED'; });
$('previousDay').addEventListener('click', () => updateDate(-1)); $('nextDay').addEventListener('click', () => updateDate(1));
$('completeGoal').addEventListener('click', () => { $('timelineEvents').insertAdjacentHTML('afterbegin', '<div class="event"><time>NOW</time><i class="event-dot activity-dot"></i><div><strong>Mindful walk logged</strong><span>10 min · 56 active cal</span></div></div>'); $('completeGoal').textContent = 'Walk logged ✓'; $('completeGoal').disabled = true; });
$('addEvent').addEventListener('click', () => { $('timelineEvents').insertAdjacentHTML('afterbegin', '<div class="event"><time>NOW</time><i class="event-dot heart-dot"></i><div><strong>Health note added</strong><span>Manual timeline entry</span></div></div>'); });
updateMove();
