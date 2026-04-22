<<<<<<< HEAD
import { api } from './api.js';

import { getCurrentUser } from './state.js';

import { gpsResult, gpsList } from './doc.js';

import { setText, requireLogin, getActiveConvoyID } from './ui.js';



export async function shareLocation() {
  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    setText(gpsResult, 'Select a convoy first.', true);
    return;
  }

  if (!navigator.geolocation) {
    setText(gpsResult, 'Geolocation is not supported by this browser.', true);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function (position) {
      try {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));

        await api('/gps', {
          method: 'POST',
          body: JSON.stringify({
            userID: currentUser.userID,
            convoyID: convoyID,
            latitude: latitude,
            longitude: longitude
          })
        });

        setText(gpsResult, 'Location shared successfully.');

        await loadGps();

      } catch (error) {
        setText(gpsResult, error.message, true);
      }
    },
    function (error) {
      setText(gpsResult, error.message || 'Could not get location.', true);
    }
  );
}



export async function loadGps() {
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    gpsList.innerHTML = '<p>No active convoy selected.</p>';
    return;
  }

  try {
    const locations = await api(`/gps/${convoyID}`);

    if (locations.length === 0) {
      gpsList.innerHTML = '<p>No GPS data yet.</p>';
      return;
    }

    gpsList.innerHTML = locations
      .map(function (row) {
        return `
          <div>
            <strong>${row.userName}</strong><br>
            <a href="https://www.google.com/maps?q=${row.latitude},${row.longitude}" target="_blank" rel="noreferrer">
              ${row.latitude}, ${row.longitude}
            </a>
          </div>
        `;
      })
      .join('');

  } catch (error) {
    gpsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
=======
import { api } from './api.js';

import { getCurrentUser } from './state.js';

import { gpsResult, gpsList } from './doc.js';

import { setText, requireLogin, getActiveConvoyID } from './ui.js';



export async function shareLocation() {
  if (!requireLogin()) {
    return;
  }

  const currentUser = getCurrentUser();
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    setText(gpsResult, 'Select a convoy first.', true);
    return;
  }

  if (!navigator.geolocation) {
    setText(gpsResult, 'Geolocation is not supported by this browser.', true);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async function (position) {
      try {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));

        await api('/gps', {
          method: 'POST',
          body: JSON.stringify({
            userID: currentUser.userID,
            convoyID: convoyID,
            latitude: latitude,
            longitude: longitude
          })
        });

        setText(gpsResult, 'Location shared successfully.');

        await loadGps();

      } catch (error) {
        setText(gpsResult, error.message, true);
      }
    },
    function (error) {
      setText(gpsResult, error.message || 'Could not get location.', true);
    }
  );
}



export async function loadGps() {
  const convoyID = getActiveConvoyID();

  if (!convoyID) {
    gpsList.innerHTML = '<p>No active convoy selected.</p>';
    return;
  }

  try {
    const locations = await api(`/gps/${convoyID}`);

    if (locations.length === 0) {
      gpsList.innerHTML = '<p>No GPS data yet.</p>';
      return;
    }

    gpsList.innerHTML = locations
      .map(function (row) {
        return `
          <div>
            <strong>${row.userName}</strong><br>
            <a href="https://www.google.com/maps?q=${row.latitude},${row.longitude}" target="_blank" rel="noreferrer">
              ${row.latitude}, ${row.longitude}
            </a>
          </div>
        `;
      })
      .join('');

  } catch (error) {
    gpsList.innerHTML = `<p class="error">${error.message}</p>`;
  }
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
}