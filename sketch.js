var electronCount = 1
var protonCount = 1
var shells = [1]
const shellCapacaties = [2, 8, 18, 32, 50];

function setup() {
  createCanvas(800, 600);

  const addBtn = createButton('+ Proton & Electron');
  addBtn.position(20, 20);
  addBtn.mousePressed(addElectron);

  const removeBtn = createButton('- Proton & Electron');
  removeBtn.position(20, 50);
  removeBtn.mousePressed(removeElectron);

  const resetBtn = createButton('Reset');
  resetBtn.position(20, 80);
  resetBtn.mousePressed(resetAtom);

}

const protonRadius = 7
const protonOrbitRadius = 20
const nucleusRadius = 30
var nucleus = [1]

function draw() {
  background(15);
  translate(width / 2, height / 2 - 20);
 
  // Nucleus
  noStroke();
  fill(230, 180, 40);
  ellipse(0, 0, nucleusRadius * 2, nucleusRadius * 2);

  //Protons and Neutrons
  for (let i = 0; i < nucleus.length; i++) {
    let x;
    let y;
    let r;
    let angle;

    //nucleusSize = Math.cbrt(protonCount)
    for (let j = 0; j < nucleus[i]; j++) {
      angle = TWO_PI / (i * 2 + 1) * j
      // angle = TWO_PI * j / (j + i + 1);
      r = Math.sqrt(i) * 6
      x = r * cos(angle)
      y = r * sin(angle)
      if ((j + i)% 2 == 0) {
        //Proton
        fill(222, 67, 67);
        ellipse(x, y, protonRadius * 2, protonRadius * 2);
        fill(255, 255, 255);
        let crossWidth = protonRadius / 4
        let crossOffset = 3
        rect(x - crossWidth / 2, y - protonRadius + crossOffset,
             crossWidth, protonRadius * 2 - crossOffset * 2)
        rect(x - protonRadius + crossOffset, y - crossWidth / 2,
             protonRadius * 2 - crossOffset * 2, crossWidth)
      }
      else {
        //Neutron
        fill(77, 67, 222);
        ellipse(x, y, protonRadius * 2, protonRadius * 2);
      }
    }
  }

  // Neutrons
//   if (protonCount > 1) {
//       for (let i = 0; i <= protonCount; i++) {
//         fill(77, 67, 222);
//         if (protonCount == 1) {
//           x = 0
//           y = 0  
//         }
//         else {
//           angle = (TWO_PI / protonCount) * i + PI / protonCount;
//           x = protonOrbitRadius * cos(angle);
//           y = protonOrbitRadius * sin(angle);
//         }
//         ellipse(x, y, protonRadius * 2, protonRadius * 2);
//         }
//   }
 
//   // Protons
//   for (let i = 0; i <= protonCount; i++) {
//     fill(222, 67, 67);
//     if (protonCount == 1) {
//       x = 0
//       y = 0  
//     }
//     else {
//       angle = (TWO_PI / protonCount) * i;
//       x = protonOrbitRadius * cos(angle);
//       y = protonOrbitRadius * sin(angle);
//     }
//     ellipse(x, y, protonRadius * 2, protonRadius * 2);
//     fill(255, 255, 255);
//     let crossWidth = protonRadius / 4
//     let crossOffset = 3
//     rect(x - crossWidth / 2, y - protonRadius + crossOffset,
//          crossWidth, protonRadius * 2 - crossOffset * 2)
//     rect(x - protonRadius + crossOffset, y - crossWidth / 2,
//          protonRadius * 2 - crossOffset * 2, crossWidth)
//   }

  // Electron Radii
  noFill();
  strokeWeight(2);
  for (let i = 1; i <= shells.length; i++) {
    stroke(100 + i * 20, 160 - i * 10, 220 - i * 10);
    let r = nucleusRadius + 20 + (50 - 4 * i) * i - 5 * Math.sqrt(protonCount)
    ellipse(0, 0, r * 2, r * 2);
  }
 
  // Electrons
  for (let i = 0; i < shells.length; i++) {
    let r = nucleusRadius + 20 + (50 - 4 * (i+1)) * (i+1) - 5 * Math.sqrt(protonCount)
    for (let j = 0; j < shells[i]; j++) {
      let angle = (TWO_PI / shells[i]) * (j+1) + frameCount * 0.03 / (i+1);
      let x = r * cos(angle)
      let y = r * sin(angle)
      fill(85, 222, 67);
      noStroke();
      ellipse(x, y, 10, 10);
        fill(255, 255, 255);
      let crossWidth = protonRadius / 4
      let crossOffset = 3
      rect(x - protonRadius + crossOffset, y - crossWidth / 2,
         protonRadius * 2 - crossOffset * 2, crossWidth)
    }
  }
  
  // Display stats including element symbol
  noStroke();
  fill(255);
  textAlign(LEFT);
  textSize(16);
  const infoX = -width / 2 + 20;
  const infoY = 220;
  const elementSymbol = elements[electronCount] || '?';
  text(`Element: ${elementSymbol}`, infoX, infoY);
  text(`Electron Count: ${electronCount}`, infoX, infoY + 25);
  text(`Proton Count: ${protonCount}`, infoX, infoY + 50);
  text(`Shells: ${shells}`, infoX, infoY + 75);
}

function addElectron() {
  if (electronCount != 110) {
    electronCount++;
    protonCount++;
    updateNucleusParticles();
    updateElectronRadii();
  }
}

function removeElectron() {
  if (electronCount != 1) {
    electronCount--;
    protonCount--;
    updateNucleusParticles();
    updateElectronRadii();
  }
}

function resetAtom() {
  electronCount = 1;
  protonCount = 1;
  updateNucleusParticles();
  updateElectronRadii();
}
 
function updateNucleusParticles() {
  nucleus = [0]
  if (protonCount == 1) {
    nucleus = [1];
    return
  }
  else {
    let level = 0
    for (let i = 0; i < protonCount * 2; i++) {
      if (nucleus[level] >= level * 2 + 1) {
        level++
        nucleus[level] = 1
      }
      else {
        nucleus[level]++
      }
    }
  }
}

function updateElectronRadii() {
  shells = [0]
  let shellLevel = 0
  for (let i = 0; i < electronCount; i++) {
    if (shells[shellLevel] < shellCapacaties[shellLevel]) {
      shells[shellLevel]++
    } 
    else {
      shellLevel++
      shells[shellLevel] = 1
    }
  }
}
 
//Periodic Table
const elements = { 1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F", 10: "Ne", 11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl", 18: "Ar", 19: "K", 20: "Ca", 21: "Sc", 22: "Ti", 23: "V", 24: "Cr", 25: "Mn", 26: "Fe", 27: "Co", 28: "Ni", 29: "Cu", 30: "Zn", 31: "Ga", 32: "Ge", 33: "As", 34: "Se", 35: "Br", 36: "Kr", 37: "Rb", 38: "Sr", 39: "Y", 40: "Zr", 41: "Nb", 42: "Mo", 43: "Tc", 44: "Ru", 45: "Rh", 46: "Pd", 47: "Ag", 48: "Cd", 49: "In", 50: "Sn", 51: "Sb", 52: "Te", 53: "I", 54: "Xe", 55: "Cs", 56: "Ba", 57: "La", 58: "Ce", 59: "Pr", 60: "Nd", 61: "Pm", 62: "Sm", 63: "Eu", 64: "Gd", 65: "Tb", 66: "Dy", 67: "Ho", 68: "Er", 69: "Tm", 70: "Yb", 71: "Lu", 72: "Hf", 73: "Ta", 74: "W", 75: "Re", 76: "Os", 77: "Ir", 78: "Pt", 79: "Au", 80: "Hg", 81: "Tl", 82: "Pb", 83: "Bi", 84: "Po", 85: "At", 86: "Rn", 87: "Fr", 88: "Ra", 89: "Ac", 90: "Th", 91: "Pa", 92: "U", 93: "Np", 94: "Pu", 95: "Am", 96: "Cm", 97: "Bk", 98: "Cf", 99: "Es", 100: "Fm", 101: "Md", 102: "No", 103: "Lr", 104: "Rf", 105: "Db", 106: "Sg", 107: "Bh", 108: "Hs", 109: "Mt", 110: "Ds", 111: "Rg", 112: "Cn", 113: "Nh", 114: "Fl", 115: "Mc", 116: "Lv", 117: "Ts", 118: "Og" };