
import { Get } from "./getCards/get";

function pullCards() {
  // Get minions
  const pullMinions = new Promise((resolve) => {
    get.minions(() => {
      resolve();
    });
  });

  // Get spells
  const pullSpells = new Promise((resolve) => {
    get.spells(() => {
      resolve();
    });
  });

  // Get weapons
  const pullWeapons = new Promise((resolve) => {
    get.weapons(() => {
      resolve();
    });
  });

  // Resolve promise with loggin stmt
  Promise.all([pullMinions, pullSpells, pullWeapons]).then(() => {
    console.log("Done.")
  }).catch((err) => {
    throw err;
  });
}
