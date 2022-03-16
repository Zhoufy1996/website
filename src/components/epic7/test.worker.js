const enhanceOnce = (equipment) => {
    const getEnhanceItem = ()  => {
      return randomSelect(equipment.subAttributes);
    };
  
    const enhancedProperties = enhancedProbabilityData.filter((item) => {
      return item.quality === equipment.quality && item.level === equipment.level;
    });
  
    const getRestEnhanceItem = () => {
      const existPropertyCode = equipment.subAttributes.map((item) => item.code);
      const notExistPropertyCode = propertyArray.filter((code) => !existPropertyCode.includes(code));
      return {
        value: 0,
        code: randomSelect(notExistPropertyCode),
      };
    };
  
    const getEnhanceValue = (equipmentSubAttributeItem) => {
      const randomValue = Math.random() * 100;
      let restValue = randomValue;
      let index = 0;
  
      const attritubeEnhancedProbabilities = enhancedProperties
        .find((item) => item.code === equipmentSubAttributeItem.code)?.enhancedProperties;
  
      if (attritubeEnhancedProbabilities == null) {
        return 0;
      }
  
      while (restValue >= 0 && attritubeEnhancedProbabilities[index] != null) {
        restValue -= attritubeEnhancedProbabilities[index].probability;
        index += 1;
      }
  
      return attritubeEnhancedProbabilities[index - 1].value;
    };
  
    const enhanceItemOnce = (equipmentAttributeItem) => {
      return {
        ...equipmentAttributeItem,
        value: equipmentAttributeItem.value + getEnhanceValue(equipmentAttributeItem),
      };
    };
  
    const shouldAddOneProperty = () => {
      return equipment.quality === 'hero' && equipment.enhancedLevel >= 9 && equipment.enhancedLevel < 12;
    };
  
    let enhanceItem;
  
    if (shouldAddOneProperty()) {
      enhanceItem = getRestEnhanceItem();
  
      return {
        ...equipment,
        subAttributes: [
          ...equipment.subAttributes,
          enhanceItemOnce(enhanceItem),
        ],
      };
    }
  
    enhanceItem = getEnhanceItem();
  
    return {
      ...equipment,
      enhancedLevel: equipment.enhancedLevel + 3,
      subAttributes: equipment.subAttributes.map((equipmentAttributeItem) => {
        if (equipmentAttributeItem.code === enhanceItem.code) {
          return enhanceItemOnce(equipmentAttributeItem);
        }
  
        return equipmentAttributeItem;
      }),
    };
};
  
// 强化到15
const enhanceMax = (equipmentProperty) => {
let temp = equipmentProperty;
while (temp.enhancedLevel < 15) {
    temp = enhanceOnce(temp);
}

return temp;
};

self.onmessage = (e) => {
    const {equipment, count} = e.data;
    const reuslt = new Array(Number(count)).fill(1).map(() => {
        return enhanceMax(equipment);
    })

    postMessage(reuslt)
}