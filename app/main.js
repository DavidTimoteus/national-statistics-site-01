// NusaStat — router. Reads the hash, renders the matching view into #app,
// marks the active nav link, and re-renders when a control changes state.

import {
  viewOverview, viewPopulation, viewEconomy,
  viewHealth, viewRegions, viewData, bindControls,
} from './views.js';

const ROUTES = {
  '/': { view: viewOverview, title: 'NusaStat — Statistik Indonesia' },
  '/populasi': { view: viewPopulation, title: 'Populasi — NusaStat' },
  '/ekonomi': { view: viewEconomy, title: 'Ekonomi — NusaStat' },
  '/kesehatan-pendidikan': { view: viewHealth, title: 'Kesehatan & Pendidikan — NusaStat' },
  '/daerah': { view: viewRegions, title: 'Daerah — NusaStat' },
  '/data': { view: viewData, title: 'Data & Sumber — NusaStat' },
};

const app = document.getElementById('app');

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ?? ROUTES['/'];
}

function render() {
  const route = currentRoute();
  app.innerHTML = route.view();
  document.title = route.title;
  document.querySelectorAll('.nav a').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#/, '') || '/';
    a.classList.toggle('active', target === (window.location.hash.replace(/^#/, '') || '/'));
  });
  bindControls(app, render);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
