export function answer(question, data) {
  const q = question.toLowerCase();
  if (/best|return|roi|compare/.test(q) && /event|return|roi/.test(q)) {
    return data.events.map(event => `${event.name}: ${Math.round((event.revenue - event.cost) / event.cost * 100)}% ROI`).join('\n');
  }
  const event = data.events.find(item => q.includes(item.name.toLowerCase()));
  const zone = data.zones.find(item => q.includes(item.name.toLowerCase())) ||
    (/losing|loss|underperform/.test(q) ? data.zones.find(item => item.profit < 0) : null);
  const item = event || zone;
  if (item) {
    return `${item.name}\nLinked revenue: £${item.revenue.toLocaleString('en-GB')}\nAllocated costs: £${item.cost.toLocaleString('en-GB')}\nOperating profit: £${(item.revenue - item.cost).toLocaleString('en-GB')}\nEstimated visits: ${item.visits.toLocaleString('en-GB')}\n\nIllustrative October records; not live data.`;
  }
  if (/occupancy|busy|capacity/.test(q)) {
    return 'Demo peak estimated occupancy: 380 / 500 people (76%). Busiest window: Friday 18:00–20:00. Wi-Fi activity is a sample, not a direct headcount.';
  }
  if (/revenue|sales|profit/.test(q)) {
    return `Linked sales: £${data.zones.reduce((total, item) => total + item.revenue, 0).toLocaleString('en-GB')}. Sales come from POS records, not Wi-Fi logins.`;
  }
  return 'This demo supports event returns, occupancy and zone performance. Try “Which zone is losing money?” or name Late Sessions. No live AI service is connected.';
}
