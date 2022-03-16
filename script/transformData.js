const fs = require("fs")

const data = JSON.parse(fs.readFileSync("./epic7_equipment_enhance_probility.json").toString())

const resultMap = new Map();

data.forEach(item => {
  if (item.quality === 'rare') {
    return;
  }

  const key = {
    quality: item.quality,
    level: item.level,
    code: item.code,
  };

  const value = {
    value: item.value,
    probability: item.probability,
  };
  const keyString = JSON.stringify(key);
  if (resultMap.has(keyString)) {
    resultMap.get(keyString)?.push(value);
  } else {
    resultMap.set(keyString, [value]);
  }
})

const result  = [];

resultMap.forEach((value, key) => {
  const keyObj = JSON.parse(key) 
  result.push({
    ...keyObj,
    enhancedProperties: value,
  });
});

fs.writeFileSync('./epci7_probility_data.json', JSON.stringify(result));
