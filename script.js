// --- DOM Elements & Setup ---
const appContainer = document.getElementById('appContainer');
const sidebar = document.getElementById('sidebar');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
const sidebarExpandBtn = document.getElementById('sidebarExpandBtn');

// Config Form elements
const titrationDirection = document.getElementById('titrationDirection');
const standardSolution = document.getElementById('standardSolution');
const standardConcInput = document.getElementById('standardConc');
const standardConcVal = document.getElementById('standardConcVal');
const unknownSolution = document.getElementById('unknownSolution');
const unknownVolumeInput = document.getElementById('unknownVolume');
const unknownVolumeVal = document.getElementById('unknownVolumeVal');
const indicatorBtns = document.querySelectorAll('.indicator-btn');

// Control elements
const dropSpeedSelect = document.getElementById('dropSpeed');
const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const moveToEqBtn = document.getElementById('moveToEqBtn');
const toggleGraphFullscreenBtn = document.getElementById('toggleGraphFullscreenBtn');
let isGraphFullscreen = false;
let graphScale = 1.0;
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// Floating controls (collapsed mode)
const floatingSimControls = document.getElementById('floatingSimControls');
const floatPrevBtn = document.getElementById('floatPrevBtn');
const floatPlayBtn = document.getElementById('floatPlayBtn');
const floatNextBtn = document.getElementById('floatNextBtn');
const floatResetBtn = document.getElementById('floatResetBtn');
const floatPlayIcon = document.getElementById('floatPlayIcon');
const floatPauseIcon = document.getElementById('floatPauseIcon');

// Quiz elements
const guessInput = document.getElementById('guessInput');
const checkGuessBtn = document.getElementById('checkGuessBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const quizResult = document.getElementById('quizResult');
const molecularEq = document.getElementById('molecularEq');
const netIonicEq = document.getElementById('netIonicEq');

// Status Pill Displays
const pHDisplay = document.getElementById('pHDisplay');
const addedVolDisplay = document.getElementById('addedVolDisplay');
const flaskVolDisplay = document.getElementById('flaskVolDisplay');

// Canvas setup
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const canvasViewport = document.getElementById('canvasViewport');

// Canvas floating navigation controls
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const fitScreenBtn = document.getElementById('fitScreenBtn');
const modePanBtn = document.getElementById('modePanBtn');
const modeDrawBtn = document.getElementById('modeDrawBtn');

// Drawing Toolbar elements
const drawToolbar = document.getElementById('drawToolbar');
const colorBtns = document.querySelectorAll('.color-btn');
const penThicknessInput = document.getElementById('penThickness');
const drawPenBtn = document.getElementById('drawPenBtn');
const drawEraserBtn = document.getElementById('drawEraserBtn');
const drawClearAllBtn = document.getElementById('drawClearAllBtn');
const drawColorDark = document.getElementById('drawColorDark');

// --- Solution Data ---
const acids = {
  HCl: { id: 'HCl', name: '염산 (HCl, 1가 강산)', valency: 1, type: 'strong_acid' },
  H2SO4: { id: 'H2SO4', name: '황산 (H₂SO₄, 2가 강산)', valency: 2, type: 'strong_acid' },
  H3PO4: { id: 'H3PO4', name: '인산 (H₃PO₄, 3가 약산)', valency: 3, type: 'weak_acid' }
};

const bases = {
  'NaOH': { id: 'NaOH', name: '수산화 나트륨 (NaOH, 1가 강염기)', valency: 1, type: 'strong_base' },
  'Ca(OH)2': { id: 'Ca(OH)2', name: '수산화 칼슘 (Ca(OH)₂, 2가 강염기)', valency: 2, type: 'strong_base' },
  'Al(OH)3': { id: 'Al(OH)3', name: '수산화 알루미늄 (Al(OH)₃, 3가 약염기)', valency: 3, type: 'weak_base' }
};

// Chemical equation mapping
const equations = {
  'HCl+NaOH': { mol: 'HCl + NaOH → NaCl + H₂O', net: 'H⁺ + OH⁻ → H₂O' },
  'HCl+Ca(OH)2': { mol: '2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O', net: 'H⁺ + OH⁻ → H₂O' },
  'HCl+Al(OH)3': { mol: '3HCl + Al(OH)₃ → AlCl₃ + 3H₂O', net: '3H⁺ + Al(OH)₃(s) → Al³⁺ + 3H₂O' },
  'H2SO4+NaOH': { mol: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O', net: 'H⁺ + OH⁻ → H₂O' },
  'H2SO4+Ca(OH)2': { mol: 'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', net: 'H⁺ + OH⁻ → H₂O' },
  'H2SO4+Al(OH)3': { mol: '3H₂SO₄ + 2Al(OH)₃ → Al₂(SO₄)₃ + 6H₂O', net: '3H⁺ + Al(OH)₃(s) → Al³⁺ + 3H₂O' },
  'H3PO4+NaOH': { mol: 'H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O', net: 'H₃PO₄ + 3OH⁻ → PO₄³⁻ + 3H₂O' },
  'H3PO4+Ca(OH)2': { mol: '2H₃PO₄ + 3Ca(OH)₂ → Ca₃(PO₄)₂ + 6H₂O', net: '2H₃PO₄ + 3Ca²⁺ + 6OH⁻ → Ca₃(PO₄)₂(s) + 6H₂O' },
  'H3PO4+Al(OH)3': { mol: 'H₃PO₄ + Al(OH)₃ → AlPO₄ + 3H₂O', net: 'H₃PO₄ + Al(OH)₃(s) → AlPO₄(s) + 3H₂O' }
};

// --- App State ---
let selectedDirection = 'base_to_acid'; // default: base titrates acid
let standardSol = null;
let unknownSol = null;
let standardConcValNum = 0.10;
let unknownConcValNum = 0.125; // randomly generated
let unknownVolumeValNum = 20;
let addedVolumeNum = 0.0;
let currentPHNum = 7.0;
let currentIndicator = 'btb';
let isPlaying = false;
let autoDropTimer = null;
let dropSpeedValue = 'normal'; // default speed option
let hasPausedAtEquivalence = false; // Whether the titration has already paused once at the equivalence point
let maxVolume = 50.0; // Dynamic maximum titration volume based on equivalence point
let stirBarAngle = 0; // Rotation angle of the magnetic stir bar

// Animation State
let drops = [];
let ripples = [];
let cloudiness = 0.0; // cloudiness overlay for insoluble Al(OH)3

// View State (Zoom/Pan)
let zoom = 1.0;
let panX = 0;
let panY = 0;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;

// Touch State
let touchStartDist = 0;
let touchStartZoom = 1.0;
let touchStartMidX = 0;
let touchStartMidY = 0;
let touchStartPanX = 0;
let touchStartPanY = 0;

// Drawing State
let drawMode = 'pan'; // 'pan' or 'draw'
let activeTool = 'pen'; // 'pen' or 'eraser'
let drawColor = '#e11d48';
let drawThickness = 4;
let isDrawing = false;
let drawingLines = []; // Array of {color, thickness, tool, points: [{x, y}]}
let currentLine = null;

// History State (Undo)
let historyStack = [];

// Graph Data Points
let graphPoints = [];

// --- Init & Event Binding ---
window.addEventListener('DOMContentLoaded', () => {
  setupDirection();
  generateRandomUnknown();
  resetSimulation();
  
  // Fit viewport on startup
  setTimeout(() => {
    resizeCanvas();
    fitToScreen();
  }, 100);

  // Resize listener
  window.addEventListener('resize', resizeCanvas);
  
  // UI Event Listeners
  titrationDirection.addEventListener('change', (e) => {
    selectedDirection = e.target.value;
    setupDirection();
    generateRandomUnknown();
    resetSimulation();
  });
  
  standardSolution.addEventListener('change', () => {
    updateChemicalEquation();
    resetSimulation();
  });
  
  unknownSolution.addEventListener('change', () => {
    updateChemicalEquation();
    generateRandomUnknown();
    resetSimulation();
  });
  
  standardConcInput.addEventListener('input', (e) => {
    standardConcValNum = parseFloat(e.target.value);
    standardConcVal.textContent = `${standardConcValNum.toFixed(2)} M`;
    resetSimulation();
  });
  
  unknownVolumeInput.addEventListener('input', (e) => {
    unknownVolumeValNum = parseInt(e.target.value);
    unknownVolumeVal.textContent = `${unknownVolumeValNum} mL`;
    resetSimulation();
  });
  
  indicatorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      indicatorBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      currentIndicator = target.getAttribute('data-indicator');
      updatePHDisplays();
      draw();
    });
  });
  
  dropSpeedSelect.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    const labels = ['멈춤 (콕 닫힘)', '느리게 (0.5 mL/초)', '보통 (2.0 mL/초)', '빠르게 (5.0 mL/초)'];
    const values = ['stop', 'slow', 'normal', 'fast'];
    
    dropSpeedValue = values[val];
    document.getElementById('dropSpeedVal').textContent = labels[val];
    
    if (dropSpeedValue === 'stop') {
      stopAutoDrop();
    } else if (isPlaying) {
      // Hot restart of the drop interval
      if (autoDropTimer) {
        clearInterval(autoDropTimer);
        autoDropTimer = null;
      }
      
      let interval = 100;
      if (dropSpeedValue === 'slow') interval = 200;
      else if (dropSpeedValue === 'normal') interval = 100;
      else if (dropSpeedValue === 'fast') interval = 80;
      
      autoDropTimer = setInterval(() => {
        spawnDroplet();
      }, interval);
    }
  });

  // Controls Event Listeners
  prevBtn.addEventListener('click', stepBackward);
  nextBtn.addEventListener('click', stepForward);
  playBtn.addEventListener('click', togglePlay);
  resetBtn.addEventListener('click', resetSimulation);
  moveToEqBtn.addEventListener('click', moveToEquivalencePoint);

  floatPrevBtn.addEventListener('click', stepBackward);
  floatNextBtn.addEventListener('click', stepForward);
  floatPlayBtn.addEventListener('click', togglePlay);
  floatResetBtn.addEventListener('click', resetSimulation);
  
  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);
  
  // Sidebar toggles
  sidebarCollapseBtn.addEventListener('click', collapseSidebar);
  sidebarExpandBtn.addEventListener('click', expandSidebar);
  
  // Quiz verify
  checkGuessBtn.addEventListener('click', checkQuizAnswer);
  showAnswerBtn.addEventListener('click', showQuizAnswerAndExplanation);
  
  // Canvas Nav Controls
  zoomInBtn.addEventListener('click', () => zoomAroundCenter(1.15));
  zoomOutBtn.addEventListener('click', () => zoomAroundCenter(1 / 1.15));
  fitScreenBtn.addEventListener('click', fitToScreen);
  
  toggleGraphFullscreenBtn.addEventListener('click', () => {
    isGraphFullscreen = !isGraphFullscreen;
    
    const dashboard = document.querySelector('.canvas-header-info');
    if (isGraphFullscreen) {
      toggleGraphFullscreenBtn.classList.add('active');
      toggleGraphFullscreenBtn.querySelector('span').textContent = '실험장치 보기';
      dashboard.classList.add('fullscreen-graph-mode');
    } else {
      toggleGraphFullscreenBtn.classList.remove('active');
      toggleGraphFullscreenBtn.querySelector('span').textContent = '그래프 크게보기';
      dashboard.classList.remove('fullscreen-graph-mode');
    }
    
    draw();
  });
  
  modePanBtn.addEventListener('click', () => setCanvasMode('pan'));
  modeDrawBtn.addEventListener('click', () => setCanvasMode('draw'));
  
  // Graph Scale Segmented Controller
  const scaleBtns = document.querySelectorAll('.scale-btn');
  scaleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      scaleBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      const pct = target.id.replace('graphScale', '');
      graphScale = parseInt(pct) / 100;
      draw();
    });
  });
  
  // Canvas Drawing Toolbar
  colorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      colorBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      drawColor = e.currentTarget.getAttribute('data-color');
    });
  });
  
  penThicknessInput.addEventListener('input', (e) => {
    drawThickness = parseInt(e.target.value);
  });
  
  drawPenBtn.addEventListener('click', () => {
    drawPenBtn.classList.add('active');
    drawEraserBtn.classList.remove('active');
    activeTool = 'pen';
  });
  
  drawEraserBtn.addEventListener('click', () => {
    drawEraserBtn.classList.add('active');
    drawPenBtn.classList.remove('active');
    activeTool = 'eraser';
  });
  
  drawClearAllBtn.addEventListener('click', () => {
    drawingLines = [];
    draw();
  });
  
  // Mouse & Touch Listeners on Canvas
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);
  canvas.addEventListener('wheel', handleWheel, { passive: false });
  
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
  
  // Animation Loop
  requestAnimationFrame(animationLoop);
});

// --- Theme Management ---
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode', !isDark);
  
  if (isDark) {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    drawColorDark.style.backgroundColor = '#ffffff';
    drawColorDark.setAttribute('data-color', '#ffffff');
    if (drawColor === '#000000') {
      drawColor = '#ffffff';
      colorBtns.forEach(b => {
        if(b.id === 'drawColorDark') b.classList.add('active');
        else b.classList.remove('active');
      });
    }
  } else {
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    drawColorDark.style.backgroundColor = '#000000';
    drawColorDark.setAttribute('data-color', '#000000');
    if (drawColor === '#ffffff') {
      drawColor = '#000000';
      colorBtns.forEach(b => {
        if(b.id === 'drawColorDark') b.classList.add('active');
        else b.classList.remove('active');
      });
    }
  }
  draw();
}

// --- Sidebar Management ---
function collapseSidebar() {
  appContainer.classList.add('sidebar-collapsed');
  sidebarExpandBtn.classList.remove('hidden');
  floatingSimControls.classList.remove('hidden');
  setTimeout(resizeCanvas, 350); // Resize after transition
}

function expandSidebar() {
  appContainer.classList.remove('sidebar-collapsed');
  sidebarExpandBtn.classList.add('hidden');
  floatingSimControls.classList.add('hidden');
  setTimeout(resizeCanvas, 350);
}

// --- Menu Options Setup ---
function setupDirection() {
  standardSolution.innerHTML = '';
  
  if (selectedDirection === 'acid_to_base') {
    document.getElementById('standardSolLabel').textContent = '표준 용액 (산, 뷰렛액)';
    document.getElementById('unknownSolLabel').textContent = '미지 용액 (염기, 플라스크액)';
    
    Object.values(acids).forEach(acid => {
      const opt = document.createElement('option');
      opt.value = acid.id;
      opt.textContent = acid.name;
      standardSolution.appendChild(opt);
    });
    
    unknownSolution.innerHTML = '';
    Object.values(bases).forEach(base => {
      const opt = document.createElement('option');
      opt.value = base.id;
      opt.textContent = base.name;
      unknownSolution.appendChild(opt);
    });
  } else {
    document.getElementById('standardSolLabel').textContent = '표준 용액 (염기, 뷰렛액)';
    document.getElementById('unknownSolLabel').textContent = '미지 용액 (산, 플라스크액)';
    
    Object.values(bases).forEach(base => {
      const opt = document.createElement('option');
      opt.value = base.id;
      opt.textContent = base.name;
      standardSolution.appendChild(opt);
    });
    
    unknownSolution.innerHTML = '';
    Object.values(acids).forEach(acid => {
      const opt = document.createElement('option');
      opt.value = acid.id;
      opt.textContent = acid.name;
      unknownSolution.appendChild(opt);
    });
  }
  
  updateChemicalEquation();
}

function updateChemicalEquation() {
  const stdId = standardSolution.value;
  let unkId = unknownSolution.value;
  
  if (!unkId) {
    if (selectedDirection === 'acid_to_base') {
      const acidKeys = Object.keys(acids);
      const idx = acidKeys.indexOf(stdId);
      const baseKeys = Object.keys(bases);
      unkId = baseKeys[idx >= 0 ? idx : 0];
    } else {
      const baseKeys = Object.keys(bases);
      const idx = baseKeys.indexOf(stdId);
      const acidKeys = Object.keys(acids);
      unkId = acidKeys[idx >= 0 ? idx : 0];
    }
    unknownSolution.value = unkId;
  }
  
  standardSol = selectedDirection === 'acid_to_base' ? acids[stdId] : bases[stdId];
  unknownSol = selectedDirection === 'acid_to_base' ? bases[unkId] : acids[unkId];
  
  const key = selectedDirection === 'acid_to_base' ? `${stdId}+${unkId}` : `${unkId}+${stdId}`;
  if (equations[key]) {
    molecularEq.textContent = equations[key].mol;
    netIonicEq.textContent = equations[key].net;
  }
}

function generateRandomUnknown() {
  unknownConcValNum = parseFloat((Math.random() * 0.20 + 0.05).toFixed(3));
  hideQuizResult();
}

// --- Simulation State Calculations ---
function resetSimulation() {
  stopAutoDrop();
  addedVolumeNum = 0.0;
  historyStack = [];
  graphPoints = [];
  drops = [];
  ripples = [];
  hasPausedAtEquivalence = false;
  
  // Calculate dynamic max volume
  const nStd = standardSol ? standardSol.valency : 1;
  const nUnk = unknownSol ? unknownSol.valency : 1;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  if (vEq <= 40.0) {
    maxVolume = 50.0;
  } else {
    maxVolume = Math.ceil((vEq * 1.25) / 10) * 10;
  }
  
  updatePH();
  updatePHDisplays();
  
  draw();
}

function calculatePHAtVolume(vAdded) {
  const cStd = standardConcValNum;
  const cUnk = unknownConcValNum;
  const vUnk = unknownVolumeValNum;
  
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  
  const meqUnk = nUnk * cUnk * vUnk;
  const meqStdAdded = nStd * cStd * vAdded;
  const Kw = 1e-14;
  
  let ph = 7.0;
  
  const isBuretteAcid = (selectedDirection === 'acid_to_base');
  
  if (isBuretteAcid) {
    const isBaseStrong = (unknownSol.type === 'strong_base');
    const isAcidStrong = (standardSol.type === 'strong_acid');
    const vEq = meqUnk / (nStd * cStd);
    
    if (isBaseStrong && isAcidStrong) {
      // Strong Base titrated with Strong Acid (Burette: Acid, Flask: Base)
      // delta is excess H+ concentration in flask
      const delta = (meqStdAdded - meqUnk) / (vUnk + vAdded);
      const H = (delta + Math.sqrt(delta * delta + 4 * Kw)) / 2;
      ph = -Math.log10(H);
    } else if (isBaseStrong && !isAcidStrong) {
      // Strong Base titrated with Weak Acid (H3PO4)
      const vEq3 = vEq;
      const vEq1 = vEq3 / 3;
      const vEq2 = 2 * vEq3 / 3;
      
      if (vAdded < vEq1) {
        const delta = (meqUnk - 3 * cStd * vAdded) / (vUnk + vAdded); // excess OH-
        const H = (-delta + Math.sqrt(delta * delta + 4 * Kw)) / 2;
        ph = -Math.log10(H);
      } else if (vAdded >= vEq1 && vAdded < vEq2) {
        const f = (vAdded - vEq1) / vEq1;
        ph = 12.35 - safeLogRatio(f);
      } else {
        const excessVol = vAdded - vEq2;
        ph = 7.20 - 4.5 * (excessVol / (excessVol + 2.0));
      }
    } else if (!isBaseStrong && isAcidStrong) {
      // Weak Base (Al(OH)3) titrated with Strong Acid
      if (vAdded < vEq) {
        ph = Math.max(5.0, 9.0 - 4.0 * (vAdded / vEq));
      } else {
        const delta = (nStd * cStd * (vAdded - vEq)) / (vUnk + vAdded); // excess H+
        ph = Math.min(5.0, -Math.log10(Math.max(1e-14, delta)));
      }
    } else {
      const ratio = vAdded / vEq;
      if (ratio < 1.0) {
        ph = 8.5 - 3.5 * ratio;
      } else {
        ph = 5.0 - 2.0 * (ratio - 1.0);
      }
    }
  } else {
    // Burette: Base, Flask: Acid
    const isAcidStrong = (unknownSol.type === 'strong_acid');
    const isBaseStrong = (standardSol.type === 'strong_base');
    const vEq = meqUnk / (nStd * cStd);
    
    if (isAcidStrong && isBaseStrong) {
      // Strong Acid titrated with Strong Base (Burette: Base, Flask: Acid)
      const delta = (meqUnk - meqStdAdded) / (vUnk + vAdded); // excess H+
      const H = (delta + Math.sqrt(delta * delta + 4 * Kw)) / 2;
      ph = -Math.log10(H);
    } else if (!isAcidStrong && isBaseStrong) {
      // Weak Acid (H3PO4) titrated with Strong Base
      const vEq3 = vEq;
      const vEq1 = vEq3 / 3;
      const vEq2 = 2 * vEq3 / 3;
      
      if (vAdded < vEq1) {
        const f = vAdded / vEq1;
        ph = 2.15 + safeLogRatio(f);
      } else if (vAdded >= vEq1 && vAdded < vEq2) {
        const f = (vAdded - vEq1) / vEq1;
        ph = 7.20 + safeLogRatio(f);
      } else {
        const excessVol = vAdded - vEq2;
        ph = 9.70 + 3.0 * (excessVol / (excessVol + 2.0));
      }
    } else if (isAcidStrong && !isBaseStrong) {
      // Strong Acid titrated with Weak Base (Al(OH)3)
      if (vAdded < vEq) {
        const delta = (meqUnk - 3 * cStd * vAdded) / (vUnk + vAdded); // excess H+
        ph = Math.min(5.0, -Math.log10(Math.max(1e-14, delta)));
      } else {
        const excessVol = vAdded - vEq;
        ph = 5.0 + 3.5 * (excessVol / (excessVol + 2.0));
      }
    } else {
      const ratio = vAdded / vEq;
      if (ratio < 1.0) {
        ph = 3.5 + 2.5 * ratio;
      } else {
        ph = 6.0 + 2.0 * (ratio - 1.0);
      }
    }
  }
  
  return Math.max(1.0, Math.min(13.0, ph));
}

function safeLogRatio(f) {
  const clamped = Math.max(0.005, Math.min(0.995, f));
  return Math.log10(clamped / (1 - clamped));
}

function updatePH() {
  currentPHNum = calculatePHAtVolume(addedVolumeNum);
  
  const vEq = (unknownSol.valency * unknownConcValNum * unknownVolumeValNum) / (standardSol.valency * standardConcValNum);
  
  if (unknownSol.id === 'Al(OH)3') {
    if (selectedDirection === 'acid_to_base') {
      cloudiness = Math.max(0.0, 1.0 - (addedVolumeNum / vEq));
    }
  } else if (standardSol.id === 'Al(OH)3') {
    if (selectedDirection === 'base_to_acid') {
      cloudiness = addedVolumeNum > vEq ? Math.min(1.0, (addedVolumeNum - vEq) / 5.0) : 0.0;
    }
  } else {
    cloudiness = 0.0;
  }
}

function updatePHDisplays() {
  pHDisplay.textContent = currentPHNum.toFixed(2);
  addedVolDisplay.textContent = `${addedVolumeNum.toFixed(2)} mL`;
  flaskVolDisplay.textContent = `${(unknownVolumeValNum + addedVolumeNum).toFixed(1)} mL`;
  
  const indColor = getIndicatorColor(currentIndicator, currentPHNum);
  pHDisplay.style.color = indColor;
  pHDisplay.style.textShadow = `0 0 4px ${indColor}33`;
}

// --- History State Management (Undo/Redo) ---
function saveHistoryState() {
  historyStack.push({
    addedVolume: addedVolumeNum,
    pH: currentPHNum,
    graphPoints: [...graphPoints]
  });
}

function stepBackward() {
  if (historyStack.length === 0) return;
  
  const lastState = historyStack.pop();
  if (lastState) {
    addedVolumeNum = lastState.addedVolume;
    currentPHNum = lastState.pH;
    graphPoints = lastState.graphPoints;
    
    // Reset hasPausedAtEquivalence if we step back past the equivalence point
    const nStd = standardSol.valency;
    const nUnk = unknownSol.valency;
    const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
    if (addedVolumeNum < vEq) {
      hasPausedAtEquivalence = false;
    }
    
    updatePH();
    updatePHDisplays();
    draw();
  } else {
    resetSimulation();
  }
  hideQuizResult();
}

function stepForward() {
  if (addedVolumeNum >= maxVolume) return;
  
  saveHistoryState();
  
  const oldVolume = addedVolumeNum;
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  // Manual click adds a clean 0.1 mL
  addedVolumeNum += 0.1;
  if (addedVolumeNum > maxVolume) {
    addedVolumeNum = maxVolume;
  }
  
  // Snap to equivalence point if crossed manually
  if (!hasPausedAtEquivalence && oldVolume < vEq && addedVolumeNum >= vEq - 0.005) {
    addedVolumeNum = vEq;
    hasPausedAtEquivalence = true;
  }
  
  updatePH();
  updatePHDisplays();
  
  graphPoints.push({ x: addedVolumeNum, y: currentPHNum });
  
  // Trigger nice concentric splashes
  const surfaceY = getLiquidSurfaceY();
  ripples.push({
    x: 250,
    y: surfaceY,
    r: 2,
    maxR: 20,
    alpha: 1.0,
    speed: 0.8
  });
  
  draw();
}

function moveToEquivalencePoint() {
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  if (addedVolumeNum >= vEq) {
    resetSimulation();
  }
  
  // Step 1: Save base starting state (e.g. 0.0 mL) so they can undo back to start
  saveHistoryState();
  
  // Step 2: Transition to vPrev (0.2 mL before equivalence)
  const vPrev = Math.max(0.0, vEq - 0.2);
  addedVolumeNum = vPrev;
  currentPHNum = calculatePHAtVolume(vPrev);
  
  // Smooth graph curve reconstruction up to vPrev
  graphPoints = [];
  const stepVol = maxVolume / 250;
  for (let v = 0.0; v < vPrev; v += stepVol) {
    graphPoints.push({ x: v, y: calculatePHAtVolume(v) });
  }
  graphPoints.push({ x: vPrev, y: currentPHNum });
  
  // Save intermediate vPrev state to history stack
  saveHistoryState();
  
  // Step 3: Fast-forward to final equivalence point
  addedVolumeNum = vEq;
  hasPausedAtEquivalence = true;
  drops = [];
  stopAutoDrop();
  
  updatePH();
  updatePHDisplays();
  
  // Append final vEq point
  graphPoints.push({ x: vEq, y: currentPHNum });
  
  const surfaceY = getLiquidSurfaceY();
  ripples.push({
    x: 250,
    y: surfaceY,
    r: 2,
    maxR: 24,
    alpha: 1.0,
    speed: 0.95
  });
  
  draw();
  hideQuizResult();
}

// --- Interactive Simulation Loop ---
function togglePlay() {
  if (isPlaying) {
    stopAutoDrop();
  } else {
    startAutoDrop();
  }
}

function startAutoDrop() {
  if (addedVolumeNum >= maxVolume) return;
  
  if (dropSpeedValue === 'stop') {
    dropSpeedValue = 'normal';
    dropSpeedSelect.value = 2;
    document.getElementById('dropSpeedVal').textContent = '보통 (2.0 mL/초)';
  }
  
  isPlaying = true;
  
  playBtn.classList.add('play-active');
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
  
  floatPlayBtn.classList.add('play-active');
  floatPlayIcon.classList.add('hidden');
  floatPauseIcon.classList.remove('hidden');
  
  // Determine drop frequency based on selection
  let interval = 100;
  if (dropSpeedValue === 'slow') interval = 200;       // 5 drops/sec
  else if (dropSpeedValue === 'normal') interval = 100;  // 10 drops/sec
  else if (dropSpeedValue === 'fast') interval = 80;     // 12.5 drops/sec
  
  autoDropTimer = setInterval(() => {
    spawnDroplet();
  }, interval);
}

function stopAutoDrop() {
  isPlaying = false;
  if (autoDropTimer) {
    clearInterval(autoDropTimer);
    autoDropTimer = null;
  }
  
  playBtn.classList.remove('play-active');
  playIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
  
  floatPlayBtn.classList.remove('play-active');
  floatPlayIcon.classList.remove('hidden');
  floatPauseIcon.classList.add('hidden');
}

function spawnDroplet() {
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  // Calculate projected volume including droplets currently in the air
  const projectedVolume = addedVolumeNum + drops.reduce((sum, d) => sum + d.vol, 0);
  
  // If we haven't paused yet and have already scheduled enough volume to reach equivalence point,
  // do not spawn any more droplets until the user pauses/resumes.
  if (!hasPausedAtEquivalence && projectedVolume >= vEq - 0.005) {
    return;
  }
  
  const distToEq = vEq - projectedVolume;
  
  // Volume corresponding to drop speed, scaled by maxVolume
  const scaleFactor = maxVolume / 50.0;
  let vol = 0.2 * scaleFactor;
  if (dropSpeedValue === 'slow') vol = 0.1 * scaleFactor;       // 5 * 0.1 = 0.5 mL/s
  else if (dropSpeedValue === 'normal') vol = 0.2 * scaleFactor;  // 10 * 0.2 = 2.0 mL/s
  else if (dropSpeedValue === 'fast') vol = 0.4 * scaleFactor;     // 12.5 * 0.4 = 5.0 mL/s (Completes in 10s!)
  
  // Frame-perfect equivalence point landing!
  if (!hasPausedAtEquivalence && distToEq > 0.001 && distToEq <= vol) {
    vol = distToEq;
  }
  
  drops.push({
    x: 250,
    y: 418,
    vy: 5, // initial velocity
    radius: 7, // larger, distinct visual representation
    vol: vol
  });
}

// --- Animation Loop ---
function animationLoop(timestamp) {
  updatePhysics();
  draw();
  requestAnimationFrame(animationLoop);
}

function updatePhysics() {
  const surfaceY = getLiquidSurfaceY();
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  // Update falling drops
  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.vy += 0.45; // gravity acceleration
    d.y += d.vy;
    
    if (d.y >= surfaceY) {
      drops.splice(i, 1);
      
      saveHistoryState();
      const oldVolume = addedVolumeNum;
      addedVolumeNum += d.vol;
      if (addedVolumeNum > maxVolume) {
        addedVolumeNum = maxVolume;
        stopAutoDrop();
      }
      
      // Auto pause exactly at the equivalence point!
      if (!hasPausedAtEquivalence && oldVolume < vEq && addedVolumeNum >= vEq - 0.005) {
        addedVolumeNum = vEq; // snap to exact
        hasPausedAtEquivalence = true;
        drops = []; // Clear any remaining drops in flight
        stopAutoDrop();
      }
      
      updatePH();
      updatePHDisplays();
      
      graphPoints.push({ x: addedVolumeNum, y: currentPHNum });
      
      // Beautiful concentric ripples
      ripples.push({
        x: 250,
        y: surfaceY,
        r: 2,
        maxR: 24,
        alpha: 1.0,
        speed: 0.95
      });
      ripples.push({
        x: 250,
        y: surfaceY,
        r: -8,
        maxR: 16,
        alpha: 0.75,
        speed: 0.65
      });
    }
  }
  
  // Ripples decay (including delayed ripples where radius starts negative)
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    r.r += r.speed;
    if (r.r > 0) {
      r.alpha -= 0.022; // slower decay for clear splash ripples
    }
    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function getLiquidHeight() {
  const vol = unknownVolumeValNum + addedVolumeNum;
  // Let 150 mL correspond to 110px of height inside the flask
  return (vol / 150) * 110;
}

function getLiquidSurfaceY() {
  return 590 - getLiquidHeight();
}

// --- Color Helpers ---
function getIndicatorColor(ind, ph) {
  if (ind === 'pp') {
    if (ph < 8.2) return 'rgba(255, 255, 255, 0.0)';
    if (ph >= 10.0) return 'rgba(219, 39, 119, 0.82)'; // Deep Pink `#db2777`
    const ratio = (ph - 8.2) / 1.8;
    return `rgba(219, 39, 119, ${0.05 + ratio * 0.77})`;
  } else if (ind === 'btb') {
    if (ph <= 6.2) return 'rgba(234, 179, 8, 0.75)'; // Yellow
    if (ph >= 7.4) return 'rgba(37, 99, 235, 0.75)'; // Blue
    if (ph >= 6.5 && ph <= 7.1) return 'rgba(22, 163, 74, 0.75)'; // Pure Green
    
    if (ph > 6.2 && ph < 6.5) {
      // Yellow to Green
      const ratio = (ph - 6.2) / 0.3;
      const r = Math.round(234 - (234 - 22) * ratio);
      const g = Math.round(179 - (179 - 163) * ratio);
      const b = Math.round(8 + (74 - 8) * ratio);
      return `rgba(${r}, ${g}, ${b}, 0.75)`;
    } else {
      // Green to Blue
      const ratio = (ph - 7.1) / 0.3;
      const r = Math.round(22 - (22 - 37) * ratio);
      const g = Math.round(163 - (163 - 99) * ratio);
      const b = Math.round(74 + (235 - 74) * ratio);
      return `rgba(${r}, ${g}, ${b}, 0.75)`;
    }
  } else {
    if (ph <= 3.1) return 'rgba(220, 38, 38, 0.75)'; // Red
    if (ph >= 4.4) return 'rgba(234, 179, 8, 0.75)'; // Yellow
    
    const ratio = (ph - 3.1) / 1.3;
    const r = Math.round(220 + (249 - 220) * ratio);
    const g = Math.round(38 + (115 - 38) * ratio);
    const b = Math.round(38 - 30 * ratio);
    return `rgba(${r}, ${g}, ${b}, 0.75)`;
  }
}

// --- Canvas Drawing Routines ---
function draw() {
  const isDark = document.body.classList.contains('dark-mode');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const bgGrad = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 50,
    canvas.width / 2, canvas.height / 2, canvas.width
  );
  if (isDark) {
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#05070c');
  } else {
    bgGrad.addColorStop(0, '#f8fafc');
    bgGrad.addColorStop(1, '#cbd5e1');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Apparatus under zoom/pan (if not fullscreen graph)
  if (!isGraphFullscreen) {
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoom, zoom);
    drawApparatus(isDark);
    ctx.restore();
  }
  
  // 2. Draw Graph in screen coordinates
  drawGraph(isDark);
  
  // 3. Draw User Drawings under zoom/pan on top of everything (including graph)
  ctx.save();
  ctx.translate(panX, panY);
  ctx.scale(zoom, zoom);
  drawUserDrawings();
  ctx.restore();
}

function drawApparatus(isDark) {
  const wireColor = isDark ? '#475569' : '#94a3b8';
  const standColor = isDark ? '#1e293b' : '#475569';
  const glassColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(15, 23, 42, 0.16)';
  const graduationColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.3)';
  const liquidColorBurette = isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.06)';
  
  // 1. Stand Base (3D Cast-Iron Beveled)
  const baseGrad = ctx.createLinearGradient(140, 640, 140, 665);
  if (isDark) {
    baseGrad.addColorStop(0, '#334155');
    baseGrad.addColorStop(0.3, '#1e293b');
    baseGrad.addColorStop(1, '#0f172a');
  } else {
    baseGrad.addColorStop(0, '#94a3b8');
    baseGrad.addColorStop(0.3, '#475569');
    baseGrad.addColorStop(1, '#1e293b');
  }
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.roundRect(140, 640, 220, 25, 6);
  ctx.fill();
  
  // Highlight line on base top edge
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(141, 641, 218, 1, 1);
  ctx.stroke();
  
  // Stand Rod (Metallic Chrome)
  const rodGrad = ctx.createLinearGradient(170, 40, 180, 40);
  if (isDark) {
    rodGrad.addColorStop(0, '#475569');
    rodGrad.addColorStop(0.3, '#94a3b8');
    rodGrad.addColorStop(0.5, '#f1f5f9');
    rodGrad.addColorStop(0.7, '#64748b');
    rodGrad.addColorStop(1, '#334155');
  } else {
    rodGrad.addColorStop(0, '#64748b');
    rodGrad.addColorStop(0.3, '#cbd5e1');
    rodGrad.addColorStop(0.5, '#ffffff');
    rodGrad.addColorStop(0.7, '#94a3b8');
    rodGrad.addColorStop(1, '#475569');
  }
  ctx.fillStyle = rodGrad;
  ctx.fillRect(170, 40, 10, 600);
  
  // Clamps holding Burette (Split into Metal shaft and Front-wrapping rubber Claws)
  const drawDetailedClampMetal = (yCoord) => {
    // 1. Bosshead on stand rod (x: 168-182, height: 20)
    ctx.fillStyle = isDark ? '#334155' : '#64748b';
    ctx.beginPath();
    ctx.roundRect(168, yCoord - 6, 14, 20, 2);
    ctx.fill();
    
    // Bosshead tightening screw knob (left)
    ctx.fillStyle = isDark ? '#1e293b' : '#334155';
    ctx.beginPath();
    ctx.roundRect(160, yCoord - 2, 8, 12, 1);
    ctx.fill();
    
    // 2. Clamp arm shaft (x: 182 to 234)
    const armGrad = ctx.createLinearGradient(182, yCoord, 182, yCoord + 6);
    armGrad.addColorStop(0, isDark ? '#64748b' : '#94a3b8');
    armGrad.addColorStop(1, isDark ? '#334155' : '#475569');
    ctx.fillStyle = armGrad;
    ctx.fillRect(182, yCoord, 52, 6);
    
    // 3. Clamp adjustment screw (middle)
    ctx.fillStyle = isDark ? '#475569' : '#cbd5e1';
    ctx.beginPath();
    ctx.roundRect(205, yCoord - 5, 6, 5, 1);
    ctx.fill();
    
    // Claw base connector
    ctx.fillStyle = isDark ? '#475569' : '#64748b';
    ctx.fillRect(234, yCoord - 1, 4, 8);
    
    // 4. Back Prong (drawn behind burette)
    ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(234, yCoord + 3);
    ctx.lineTo(240, yCoord - 6);
    ctx.lineTo(246, yCoord - 6);
    ctx.stroke();
    
    // Back Prong red rubber tip (behind burette)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(246, yCoord - 6);
    ctx.lineTo(256, yCoord - 6);
    ctx.stroke();
  };
  
  const drawDetailedClampClaws = (yCoord) => {
    // Metallic joint pivot
    ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
    ctx.beginPath();
    ctx.arc(234, yCoord + 3, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Front Prong (drawn in front of burette)
    ctx.strokeStyle = isDark ? '#64748b' : '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(234, yCoord + 3);
    ctx.lineTo(240, yCoord + 12);
    ctx.lineTo(246, yCoord + 12);
    ctx.stroke();
    
    // Front Prong red rubber tip (in front of burette)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(246, yCoord + 12);
    ctx.lineTo(256, yCoord + 12);
    ctx.stroke();
  };
  
  drawDetailedClampMetal(140);
  drawDetailedClampMetal(320);
  
  // 2. Magnetic Stirrer Base (Ceramic Top + Metal Body Console)
  const stirrerGrad = ctx.createLinearGradient(140, 600, 140, 640);
  if (isDark) {
    stirrerGrad.addColorStop(0, '#475569');
    stirrerGrad.addColorStop(1, '#1e293b');
  } else {
    stirrerGrad.addColorStop(0, '#f1f5f9');
    stirrerGrad.addColorStop(1, '#cbd5e1');
  }
  ctx.fillStyle = stirrerGrad;
  ctx.strokeStyle = isDark ? '#334155' : '#94a3b8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(140, 600, 220, 40, 8);
  ctx.fill();
  ctx.stroke();
  
  // Stirrer Ceramic White Top Plate (Sits the flask on top)
  ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
  ctx.strokeStyle = isDark ? '#334155' : '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(150, 595, 200, 7, 2);
  ctx.fill();
  ctx.stroke();
  
  // Console Rotary Knobs (Speed and Temperature)
  const drawKnob = (cx, cy, label, angle) => {
    // Knob base shadow
    ctx.fillStyle = isDark ? '#0f172a' : '#94a3b8';
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();
    
    // Knob face
    ctx.fillStyle = isDark ? '#1e293b' : '#f8fafc';
    ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Indicator marker line
    ctx.strokeStyle = '#ef4444'; // Red pointer indicator
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * 6, cy + Math.sin(angle) * 6);
    ctx.stroke();
    
    // Label
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    ctx.font = 'bold 7px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + 14);
  };
  
  // Stir speed knob angle based on play state
  const stirAngle = isPlaying ? Math.PI * 0.75 : -Math.PI * 0.75;
  // Heat knob remains fixed at moderate warm setting
  const heatAngle = -Math.PI * 0.25;
  
  drawKnob(190, 618, 'SPEED', stirAngle);
  drawKnob(310, 618, 'HEAT', heatAngle);
  
  // Glow LED Status Indicator
  ctx.save();
  ctx.beginPath();
  ctx.arc(250, 614, 3.5, 0, Math.PI * 2);
  if (isPlaying) {
    ctx.fillStyle = '#10b981'; // Green (Active stirring)
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 6;
  } else {
    ctx.fillStyle = '#ef4444'; // Red (Idle)
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 4;
  }
  ctx.fill();
  ctx.restore();
  
  // 3. Flask Liquid (Draw inside flask. Scaled exactly to prevent bleeding)
  const bottomY = 590;
  const height = getLiquidHeight();
  const surfaceY = bottomY - height;
  
  // Flask Dimensions (Base width: 180, Neck width: 44, Neck base Y: 470, Neck top Y: 400)
  // Slant height is 120px (590 - 470), width difference is 136px (180 - 44).
  // Thus, surface width = 180 - height * (136 / 120) = 180 - height * 1.133
  // If liquid reaches the neck (height > 120px), the surface width remains constant at 44px.
  const surfaceW = height <= 120 ? (180 - height * 1.133) : 44;
  
  ctx.save();
  ctx.beginPath();
  // We inset the liquid boundary by 2.5px from the glass borders to avoid color bleeding
  ctx.moveTo(250 - surfaceW/2 + 2, surfaceY);
  ctx.lineTo(250 + surfaceW/2 - 2, surfaceY);
  ctx.lineTo(340 - 2.5, bottomY - 2.5);
  ctx.lineTo(160 + 2.5, bottomY - 2.5);
  ctx.closePath();
  
  // Fill liquid according to indicator pH
  const liquidFillStyle = getIndicatorColor(currentIndicator, currentPHNum);
  ctx.fillStyle = liquidFillStyle !== 'rgba(255, 255, 255, 0.0)' ? liquidFillStyle : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)');
  ctx.fill();
  
  // Dissolution cloudy overlay for Al(OH)3
  if (cloudiness > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${cloudiness * 0.75})`;
    ctx.fill();
  }

  // Spinning Magnetic Stir Bar (Magnet spinner)
  ctx.save();
  ctx.translate(250, bottomY - 8); // centered at bottom of flask
  if (isPlaying) {
    stirBarAngle += 0.25; // Slightly slower, more realistic spin speed
  } else {
    stirBarAngle = 0; // Static horizontally
  }
  
  // Calculate 3D perspective rotation coordinates
  const cos = Math.cos(stirBarAngle);
  const sin = Math.sin(stirBarAngle);
  const tilt = 0.22; // Tilt factor representing horizontal depth projection
  
  const apparentAngle = Math.atan2(sin * tilt, cos);
  const apparentScale = Math.sqrt(cos * cos + sin * sin * tilt * tilt);
  
  ctx.rotate(apparentAngle);
  ctx.scale(apparentScale, 1);
  
  // Draw white magnetic stir bar
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(-15, -3.5, 30, 7, 3);
  ctx.fill();
  ctx.stroke();
  
  // Pivot point / central ring detail (restored to draw a perfect circle)
  ctx.save();
  ctx.scale(1 / apparentScale, 1);
  ctx.rotate(-apparentAngle);
  ctx.fillStyle = isDark ? '#64748b' : '#cbd5e1';
  ctx.beginPath();
  ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  
  ctx.restore();
  
  ctx.restore();
  
  // 4. Flask Glass Body (Precise single line open path)
  ctx.strokeStyle = isDark ? 'rgba(240, 246, 252, 0.75)' : 'rgba(15, 23, 42, 0.65)';
  ctx.lineWidth = 4.0;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(228, 400); // neck top-left
  ctx.lineTo(228, 470); // neck bottom-left
  ctx.lineTo(160, 590); // flask bottom-left
  ctx.lineTo(340, 590); // flask bottom-right
  ctx.lineTo(272, 470); // neck bottom-right
  ctx.lineTo(272, 400); // neck top-right
  ctx.stroke(); // Do not call closePath() to avoid drawing a horizontal line at the top
  
  // Flask top lip rim (Back half only, to layer behind burette tip)
  ctx.beginPath();
  ctx.ellipse(250, 400, 22, 5, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
  
  // Flask Volumetric Markings (Etched scale lines)
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.22)';
  ctx.lineWidth = 1.2;
  ctx.font = 'bold 7px Outfit';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.4)';
  ctx.textAlign = 'left';
  
  // 50mL mark (vol = 50, y = 553.3, w = 138.5, right edge = 319.2)
  ctx.beginPath();
  ctx.moveTo(311.2, 553.3);
  ctx.lineTo(319.2, 553.3);
  ctx.stroke();
  ctx.fillText('50mL', 322.2, 555.3);
  
  // 100mL mark (vol = 100, y = 516.7, w = 96.9, right edge = 298.5)
  ctx.beginPath();
  ctx.moveTo(290.5, 516.7);
  ctx.lineTo(298.5, 516.7);
  ctx.stroke();
  ctx.fillText('100mL', 301.5, 518.7);
  
  // 150mL mark (vol = 150, y = 480.0, w = 55.4, right edge = 277.7)
  ctx.beginPath();
  ctx.moveTo(269.7, 480.0);
  ctx.lineTo(277.7, 480.0);
  ctx.stroke();
  ctx.fillText('150mL', 280.7, 482.0);
  
  // Specular Glossy Highlights (Semi-transparent white lines for realistic glass look)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  // Highlight along left neck and bottom slant
  ctx.moveTo(231, 405);
  ctx.lineTo(231, 468);
  ctx.lineTo(166, 584);
  ctx.stroke();
  
  // Smaller reflection highlight on the right base
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(334, 584);
  ctx.lineTo(315, 550);
  ctx.stroke();
  
  // 5. Ripples on liquid surface
  ripples.forEach(r => {
    if (r.r <= 0) return; // delayed ripple
    ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(r.x, r.y, r.r, r.r * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  
  // 6. Droplets Falling (Teardrops falling from Y = 418)
  drops.forEach(d => {
    ctx.save();
    ctx.fillStyle = selectedDirection === 'acid_to_base' ? 'rgba(225, 29, 72, 0.85)' : 'rgba(37, 99, 235, 0.85)';
    ctx.beginPath();
    // teardrop
    ctx.moveTo(d.x, d.y - d.radius);
    ctx.quadraticCurveTo(d.x + d.radius, d.y + d.radius, d.x, d.y + d.radius * 1.6);
    ctx.quadraticCurveTo(d.x - d.radius, d.y + d.radius, d.x, d.y - d.radius);
    ctx.fill();
    ctx.restore();
  });
  
  // 7. Burette Assembly (x: 250 centered)
  // Flared Glass Funnel Mouth at the top (y: 30 to 40)
  ctx.fillStyle = liquidColorBurette;
  ctx.beginPath();
  ctx.moveTo(237, 30);
  ctx.lineTo(263, 30);
  ctx.lineTo(258, 40);
  ctx.lineTo(242, 40);
  ctx.closePath();
  ctx.fill();
  
  ctx.strokeStyle = glassColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(237, 30);
  ctx.lineTo(263, 30);
  ctx.lineTo(258, 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(237, 30);
  ctx.lineTo(242, 40);
  ctx.stroke();

  // Glass Cylinder (Shifted 60px upwards to make space for the taller flask)
  ctx.fillStyle = liquidColorBurette;
  ctx.fillRect(242, 40, 16, 320);
  
  // Titrant liquid column inside burette
  const buretteMaxH = 300;
  const standardLiquidH = Math.max(0, buretteMaxH * (1.0 - addedVolumeNum / maxVolume));
  const liquidTopY = 50 + (buretteMaxH - standardLiquidH);
  
  const isStdAcid = (selectedDirection === 'acid_to_base');
  ctx.fillStyle = isStdAcid ? 'rgba(239, 68, 68, 0.18)' : 'rgba(59, 130, 246, 0.22)';
  ctx.fillRect(242.5, liquidTopY, 15, standardLiquidH);
  
  // Burette outer glass borders
  ctx.strokeStyle = glassColor;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(242, 40, 16, 320);
  
  // Glass Specular Cylinder Shading (Creates realistic 3D shine over liquid)
  const glassReflectGrad = ctx.createLinearGradient(242, 0, 258, 0);
  glassReflectGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
  glassReflectGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.22)');
  glassReflectGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.42)');
  glassReflectGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)');
  glassReflectGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = glassReflectGrad;
  ctx.fillRect(242.5, 40, 15, 320);
  
  // Graduations (ticks)
  ctx.strokeStyle = graduationColor;
  ctx.lineWidth = 1;
  ctx.font = '5px Outfit';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
  
  for (let step = 0; step <= 25; step++) {
    const ml = (step / 25) * maxVolume;
    const yTick = 50 + (ml / maxVolume) * buretteMaxH;
    if (step % 5 === 0) {
      // Main tick
      ctx.beginPath();
      ctx.moveTo(242, yTick);
      ctx.lineTo(249, yTick);
      ctx.stroke();
      ctx.fillText(`${ml.toFixed(0)}mL`, 232, yTick + 2);
    } else {
      // Sub tick
      ctx.beginPath();
      ctx.moveTo(242, yTick);
      ctx.lineTo(246, yTick);
      ctx.stroke();
    }
  }
  
  // 8. Stopcock valve assembly
  // Outer valve glass body casing (transparent circle)
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
  ctx.strokeStyle = glassColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(250, 365, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Glass connection tube core
  ctx.fillStyle = isDark ? '#475569' : '#cbd5e1';
  ctx.fillRect(245, 360, 10, 10);
  
  // Rotating Key Handle (Rotates based on flow status)
  ctx.save();
  ctx.translate(250, 365);
  if (!isPlaying) {
    ctx.rotate(Math.PI / 2); // Closed: Horizontal grip wings
  }
  
  // Blue Teflon stopcock handle design
  ctx.fillStyle = isDark ? '#0284c7' : '#0ea5e9';
  ctx.strokeStyle = isDark ? '#0369a1' : '#0284c7';
  ctx.lineWidth = 1.5;
  
  // Central rotor circle
  ctx.beginPath();
  ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Grip wings
  ctx.beginPath();
  ctx.roundRect(-3.5, -13, 7, 26, 3.5);
  ctx.fill();
  ctx.stroke();
  
  // Alignment white dot on the key handle wing
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -8, 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
  
  // Tip of burette
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.moveTo(244, 370);
  ctx.lineTo(256, 370);
  ctx.lineTo(251, 415);
  ctx.lineTo(249, 415);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = glassColor;
  ctx.stroke();
  
  // Draw the front half of the flask neck lip rim on top of the burette tip (3D depth layering)
  ctx.strokeStyle = isDark ? 'rgba(240, 246, 252, 0.75)' : 'rgba(15, 23, 42, 0.65)';
  ctx.lineWidth = 4.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.ellipse(250, 400, 22, 5, 0, 0, Math.PI);
  ctx.stroke();
  
  // 3D Layering: Draw the red rubber-padded clamp claws ON TOP of the burette column
  drawDetailedClampClaws(140);
  drawDetailedClampClaws(320);
}

function drawUserDrawings() {
  for (const line of drawingLines) {
    if (line.points.length === 0) continue;
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.moveTo(line.points[0].x, line.points[0].y);
    for (let i = 1; i < line.points.length; i++) {
      ctx.lineTo(line.points[i].x, line.points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }
  
  if (isDrawing && currentLine) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = currentLine.color;
    ctx.lineWidth = currentLine.thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(currentLine.points[0].x, currentLine.points[0].y);
    for (let i = 1; i < currentLine.points.length; i++) {
      ctx.lineTo(currentLine.points[i].x, currentLine.points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }
}

function drawGraph(isDark) {
  let gLeft = canvas.width * 0.56;
  let gRight = canvas.width * 0.94;
  let gTop = 130;
  let gBottom = canvas.height * 0.60;
  
  if (canvas.width < 768) {
    gLeft = canvas.width * 0.12;
    gRight = canvas.width * 0.90;
    gTop = canvas.height * 0.68;
    gBottom = canvas.height * 0.88;
  }
  
  if (isGraphFullscreen) {
    gLeft = canvas.width * 0.08;
    gRight = canvas.width * 0.92;
    gTop = 105;
    gBottom = canvas.height - 185; // Raised to clear X-axis labels and ticks from the bottom dashboard
  }
  
  // Apply graph scale factor around the center of the graph box
  if (typeof graphScale !== 'undefined' && graphScale !== 1.0) {
    const cx = (gLeft + gRight) / 2;
    const cy = (gTop + gBottom) / 2;
    const halfW = ((gRight - gLeft) / 2) * graphScale;
    const halfH = ((gBottom - gTop) / 2) * graphScale;
    
    gLeft = cx - halfW;
    gRight = cx + halfW;
    gTop = cy - halfH;
    gBottom = cy + halfH;
  }
  
  const gWidth = gRight - gLeft;
  const gHeight = gBottom - gTop;
  
  ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = isDark ? '#475569' : '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(gLeft - 5, gTop - 5, gWidth + 10, gHeight + 10, 8);
  ctx.fill();
  ctx.stroke();
  
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  ctx.lineWidth = 1;
  
  const gridInterval = maxVolume / 5;
  for (let v = gridInterval; v <= maxVolume; v += gridInterval) {
    const gx = gLeft + (v / maxVolume) * gWidth;
    ctx.beginPath();
    ctx.moveTo(gx, gTop);
    ctx.lineTo(gx, gBottom);
    ctx.stroke();
  }
  for (let ph = 2; ph <= 12; ph += 2) {
    const gy = gBottom - (ph / 14) * gHeight;
    ctx.beginPath();
    ctx.moveTo(gLeft, gy);
    ctx.lineTo(gRight, gy);
    ctx.stroke();
  }
  
  ctx.strokeStyle = isDark ? '#cbd5e1' : '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gLeft, gTop);
  ctx.lineTo(gLeft, gBottom);
  ctx.lineTo(gRight, gBottom);
  ctx.stroke();
  
  ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
  ctx.font = 'bold 24px Noto Sans KR';
  ctx.textAlign = 'center';
  ctx.fillText('주입된 표준 용액 부피 (mL)', gLeft + gWidth / 2, gBottom + 48);
  
  ctx.save();
  ctx.translate(gLeft - 48, gTop + gHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 24px Noto Sans KR';
  ctx.fillText('pH', 0, 0);
  ctx.restore();
  
  ctx.font = 'bold 20px Outfit';
  ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
  
  for (let v = 0; v <= maxVolume; v += gridInterval) {
    const gx = gLeft + (v / maxVolume) * gWidth;
    ctx.fillText(`${v.toFixed(0)}`, gx, gBottom + 20);
  }
  ctx.textAlign = 'right';
  for (let ph = 0; ph <= 14; ph += 2) {
    const gy = gBottom - (ph / 14) * gHeight;
    ctx.fillText(`${ph}`, gLeft - 12, gy + 7);
  }
  
  if (graphPoints.length > 0) {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    let startX = gLeft + (graphPoints[0].x / maxVolume) * gWidth;
    let startY = gBottom - (graphPoints[0].y / 14) * gHeight;
    ctx.moveTo(startX, startY);
    
    for (let i = 1; i < graphPoints.length; i++) {
      const gx = gLeft + (graphPoints[i].x / maxVolume) * gWidth;
      const gy = gBottom - (graphPoints[i].y / 14) * gHeight;
      ctx.lineTo(gx, gy);
    }
    ctx.stroke();
    
    const lastPt = graphPoints[graphPoints.length - 1];
    const curX = gLeft + (lastPt.x / maxVolume) * gWidth;
    const curY = gBottom - (lastPt.y / 14) * gHeight;
    
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(curX, curY, 10 + Math.sin(Date.now() / 150) * 3, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  ctx.fillStyle = isDark ? '#ffffff' : '#000000';
  ctx.font = 'bold 26px Noto Sans KR';
  ctx.textAlign = 'left';
  ctx.fillText('실시간 적정 곡선 (pH 곡선)', gLeft + 6, gTop + 24);
  
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * unknownConcValNum * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  if (addedVolumeNum >= vEq) {
    const eqX = gLeft + (vEq / maxVolume) * gWidth;
    
    ctx.save();
    ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(5, 150, 105, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    
    ctx.beginPath();
    ctx.moveTo(eqX, gTop);
    ctx.lineTo(eqX, gBottom);
    ctx.stroke();
    
    const eqPH = calculatePHAtVolume(vEq);
    const eqY = gBottom - (eqPH / 14) * gHeight;
    
    ctx.fillStyle = '#10b981';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(eqX, eqY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.font = 'bold 20px Noto Sans KR';
    ctx.fillText(`당량점: ${vEq.toFixed(2)} mL`, eqX + 10, eqY - 10);
    ctx.restore();
  }
}

// --- View Zoom / Pan Logics ---
function zoomAroundCenter(factor) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  zoomAtPoint(cx, cy, factor);
}

function zoomAtPoint(mx, my, factor) {
  const wx = (mx - panX) / zoom;
  const wy = (my - panY) / zoom;
  
  zoom = Math.max(0.4, Math.min(6.0, zoom * factor));
  
  panX = mx - wx * zoom;
  panY = my - wy * zoom;
  
  draw();
}

function fitToScreen() {
  let targetX;
  
  if (canvas.width < 768) {
    // Mobile layouts: Center horizontally and place in top section
    targetX = canvas.width * 0.5;
    zoom = Math.min((canvas.width * 0.90) / 250, (canvas.height * 0.58) / 635);
    zoom = Math.max(0.5, Math.min(2.0, zoom));
    
    panX = targetX - 250 * zoom;
    panY = (canvas.height * 0.33) - 347.5 * zoom; // Vertically center relative to top third/half
  } else {
    // Desktop layouts: Place on the left (32% width) and occupy 92% of canvas height
    targetX = canvas.width * 0.32;
    zoom = Math.min((canvas.width * 0.45) / 250, (canvas.height * 0.92) / 635);
    zoom = Math.max(0.5, Math.min(3.0, zoom));
    
    panX = targetX - 250 * zoom;
    panY = (canvas.height * 0.5) - 347.5 * zoom; // Vertically center exactly
  }
  
  draw();
}

function setCanvasMode(mode) {
  drawMode = mode;
  if (mode === 'pan') {
    modePanBtn.classList.add('active');
    modeDrawBtn.classList.remove('active');
    drawToolbar.classList.add('hidden');
    canvas.style.cursor = 'grab';
  } else {
    modeDrawBtn.classList.add('active');
    modePanBtn.classList.remove('active');
    drawToolbar.classList.remove('hidden');
    canvas.style.cursor = 'crosshair';
  }
}

// --- Canvas Resizing ---
function resizeCanvas() {
  const rect = canvasViewport.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  draw();
}

// --- Event Handlers for Canvas (Mouse) ---
function handleMouseDown(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  
  if (drawMode === 'pan') {
    isPanning = true;
    canvas.style.cursor = 'grabbing';
    panStartX = e.clientX - panX;
    panStartY = e.clientY - panY;
  } else {
    isDrawing = true;
    const wx = (mx - panX) / zoom;
    const wy = (my - panY) / zoom;
    
    currentLine = {
      color: activeTool === 'pen' ? drawColor : 'transparent',
      thickness: drawThickness,
      tool: activeTool,
      points: [{ x: wx, y: wy }]
    };
    
    if (activeTool === 'eraser') {
      eraseAtPoint(wx, wy);
    }
  }
}

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const wx = (mx - panX) / zoom;
  const wy = (my - panY) / zoom;

  if (isPanning && drawMode === 'pan') {
    panX = e.clientX - panStartX;
    panY = e.clientY - panStartY;
    draw();
  } else if (isDrawing && drawMode === 'draw') {
    if (activeTool === 'pen') {
      currentLine.points.push({ x: wx, y: wy });
      draw();
    } else if (activeTool === 'eraser') {
      eraseAtPoint(wx, wy);
    }
  }
}

function handleMouseUp() {
  if (isPanning) {
    isPanning = false;
    canvas.style.cursor = 'grab';
  }
  if (isDrawing) {
    isDrawing = false;
    if (currentLine && currentLine.points.length > 1 && activeTool === 'pen') {
      drawingLines.push(currentLine);
    }
    currentLine = null;
    draw();
  }
}

function handleWheel(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  
  const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
  zoomAtPoint(mx, my, factor);
}

function eraseAtPoint(wx, wy) {
  const eraseRadius = (drawThickness * 3.5) / zoom;
  let didErase = false;
  
  for (let i = drawingLines.length - 1; i >= 0; i--) {
    const line = drawingLines[i];
    for (const pt of line.points) {
      const dx = pt.x - wx;
      const dy = pt.y - wy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < eraseRadius) {
        drawingLines.splice(i, 1);
        didErase = true;
        break;
      }
    }
  }
  
  if (didErase) {
    draw();
  }
}

// --- Event Handlers for Canvas (Touch Gestures) ---
function handleTouchStart(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  
  if (e.touches.length === 1) {
    const t = e.touches[0];
    const mx = t.clientX - rect.left;
    const my = t.clientY - rect.top;
    const wx = (mx - panX) / zoom;
    const wy = (my - panY) / zoom;
    
    if (drawMode === 'pan') {
      isPanning = true;
      panStartX = t.clientX - panX;
      panStartY = t.clientY - panY;
    } else {
      isDrawing = true;
      currentLine = {
        color: activeTool === 'pen' ? drawColor : 'transparent',
        thickness: drawThickness,
        tool: activeTool,
        points: [{ x: wx, y: wy }]
      };
      if (activeTool === 'eraser') {
        eraseAtPoint(wx, wy);
      }
    }
  } else if (e.touches.length === 2) {
    isPanning = false;
    isDrawing = false;
    currentLine = null;
    
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    touchStartDist = Math.sqrt(dx*dx + dy*dy) || 1;
    
    touchStartMidX = ((t1.clientX + t2.clientX) / 2) - rect.left;
    touchStartMidY = ((t1.clientY + t2.clientY) / 2) - rect.top;
    
    touchStartZoom = zoom;
    touchStartPanX = panX;
    touchStartPanY = panY;
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  
  if (e.touches.length === 1) {
    const t = e.touches[0];
    const mx = t.clientX - rect.left;
    const my = t.clientY - rect.top;
    const wx = (mx - panX) / zoom;
    const wy = (my - panY) / zoom;
    
    if (isPanning && drawMode === 'pan') {
      panX = t.clientX - panStartX;
      panY = t.clientY - panStartY;
      draw();
    } else if (isDrawing && drawMode === 'draw') {
      if (activeTool === 'pen') {
        currentLine.points.push({ x: wx, y: wy });
        draw();
      } else if (activeTool === 'eraser') {
        eraseAtPoint(wx, wy);
      }
    }
  } else if (e.touches.length === 2) {
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    
    const midX = ((t1.clientX + t2.clientX) / 2) - rect.left;
    const midY = ((t1.clientY + t2.clientY) / 2) - rect.top;
    
    const factor = dist / touchStartDist;
    zoom = Math.max(0.4, Math.min(6.0, touchStartZoom * factor));
    
    const wx = (touchStartMidX - touchStartPanX) / touchStartZoom;
    const wy = (touchStartMidY - touchStartPanY) / touchStartZoom;
    
    panX = midX - wx * zoom;
    panY = midY - wy * zoom;
    
    draw();
  }
}

function handleTouchEnd(e) {
  handleMouseUp();
}

// --- Quiz Validation ---
function checkQuizAnswer() {
  const guess = parseFloat(guessInput.value);
  if (isNaN(guess)) {
    showQuizResult('입력값이 올바르지 않습니다. 숫자를 입력하세요.', 'incorrect');
    return;
  }
  
  const answer = unknownConcValNum;
  const error = Math.abs(guess - answer) / answer;
  
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * answer * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  if (error <= 0.05) {
    showQuizResult(
      `🎉 정답입니다!<br>
      실제 미지 용액의 농도: <strong>${answer.toFixed(3)} M</strong><br>
      <div style="margin-top: 8px; font-size:0.85em; text-align:left;">
        <strong>[풀이 및 해설]</strong><br>
        중화반응 양적 관계 식: <em>n M V = n' M' V'</em><br>
        • (${standardSol.name.split(' ')[0]}) ${nStd}가 × ${standardConcValNum.toFixed(2)} M × ${vEq.toFixed(2)} mL (적정 부피)<br>
        • (${unknownSol.name.split(' ')[0]}) ${nUnk}가 × M' (미지 농도) × ${unknownVolumeValNum} mL (플라스크 부피)<br>
        따라서, M' = (${nStd} × ${standardConcValNum.toFixed(2)} × ${vEq.toFixed(2)}) / (${nUnk} × ${unknownVolumeValNum}) ≈ <strong>${answer.toFixed(3)} M</strong>
      </div>`,
      'correct'
    );
  } else {
    showQuizResult(
      `❌ 틀렸습니다. 다시 한번 계산해 보세요.<br>
      <span style="font-size:0.85em;">지시약이 완전히 색이 변하는 중화점(당량점) 부피를 그래프에서 확인한 후, <em>n M V = n' M' V'</em> 공식을 사용해 보세요.</span>`,
      'incorrect'
    );
  }
}

function showQuizResult(text, className) {
  quizResult.innerHTML = `
    <div class="quiz-result-title">
      ${className === 'correct' ? '✔️ 성공' : '❌ 확인'}
    </div>
    <div>${text}</div>
  `;
  quizResult.className = `quiz-result ${className}`;
}

function hideQuizResult() {
  quizResult.className = 'quiz-result hidden';
  guessInput.value = '';
}

function showQuizAnswerAndExplanation() {
  const answer = unknownConcValNum;
  const nStd = standardSol.valency;
  const nUnk = unknownSol.valency;
  const vEq = (nUnk * answer * unknownVolumeValNum) / (nStd * standardConcValNum);
  
  showQuizResult(
    `💡 <strong>정답 및 풀이 해설:</strong><br>
    실제 미지 용액의 농도: <strong>${answer.toFixed(3)} M</strong><br>
    <div style="margin-top: 8px; font-size:0.85em; text-align:left; border-top: 1px dashed rgba(6, 95, 70, 0.2); padding-top: 8px;">
      <strong>[해설]</strong><br>
      중화반응 양적 관계 식: <em>n M V = n' M' V'</em><br>
      • (표준 용액) ${nStd}가 × ${standardConcValNum.toFixed(2)} M × ${vEq.toFixed(2)} mL (적정 완료 부피)<br>
      • (미지 용액) ${nUnk}가 × M' (미지 농도) × ${unknownVolumeValNum} mL (플라스크 용액 부피)<br>
      따라서, M' = (${nStd} × ${standardConcValNum.toFixed(2)} × ${vEq.toFixed(2)}) / (${nUnk} × ${unknownVolumeValNum}) ≈ <strong>${answer.toFixed(3)} M</strong>
    </div>`,
    'correct'
  );
}
