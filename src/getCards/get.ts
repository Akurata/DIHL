
import unirest from "unirest";
import fs from "fs";
import path from "path";
import sanitize from "sanitize-html";

export class Get {

  private request(url: string, name: string, cb: (data: any) => void): void {
    let jsonPath = path.resolve(`./output/${name}.json`);
    let txtPath = path.resolve(`./output/text/${name}.txt.json`);

    // Create request
    let req = unirest("GET", url);

    // Only get collectible cards
    req.query({
    	"collectible": "1"
    });

    // Set request headers
    req.headers({
    	"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    	"x-rapidapi-key": "21b87770ebmsh15e6fd300c3bf8dp1d0054jsna5c172f578b8",
    	"useQueryString": true
    });

    // On request completed
    req.end((res) => {
    	if(res.error) {
        throw new Error(res.error);
      }else {

        // Write json data to file when done
        const writeJson = new Promise((resolve) => {
          fs.writeFile(jsonPath, JSON.stringify(res.body, null, 2), "utf8",  () => {
            resolve();
          });
        });

        // Sanitize and write each card text
        const writeTxt = new Promise((resolve) => {
          let textArray = res.body.map((item) => {
            if(item.text) {
              // Get rid of, [x], \\n, and _ chars used for formatting
              const cleanText = item.text.replace(/(^\s*\[x\]\s*|\\n|\_+)/ig, ' ');
              return sanitize(cleanText, {allowedTags: []});
            }else {
              return '<Epsilon>'
            }
          });

          fs.writeFile(txtPath, JSON.stringify(textArray, null, 2), "utf8",  () => {
            resolve();
          });
        });

        Promise.all([writeJson, writeTxt]).then(() => {
          cb();
        }).catch((err) => {
          throw err;
        });

      }
    });

  }

  public minions(cb: (data: any) => void): void {
    this.request("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Minion", "Minions", (data) => {
      console.log("Minion data saved to ./output/Minions.json");
      cb(data);
    });
  }

  public spells(cb: (data: any) => void): void {
    this.request("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Spell", "Spells", (data) => {
      console.log("Spell data saved to ./output/Spells.json");
      cb(data);
    });
  }

  public weapons(cb: (data: any) => void): void {
    this.request("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/Weapon", "Weapons", (data) => {
      console.log("Weapon data saved to ./output/Weapons.json");
      cb(data);
    });
  }
}
