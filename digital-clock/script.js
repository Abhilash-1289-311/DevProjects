function updateClock() {
  const now = new Date();

  // Get time components
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Update time
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("time").textContent = timeString;

  // Update date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);
  document.getElementById("date").textContent = dateString;

  // Update timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById(
    "timezone"
  ).textContent = `Your Timezone: ${timezone}`;
}

// Update clock immediately
updateClock();

// Update clock every second
setInterval(updateClock, 1000);
