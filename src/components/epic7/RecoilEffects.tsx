import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { equipmentTypeOptions } from '../../data/epic7';
import {
  equipmentTypeState, selectedTemplateIdState,
  equipmentPrimaryAttributeState, equipmentAttributeState,
} from '../../store/epic7/equipment';
import { personTemplatePresetArrayState } from '../../store/epic7/template';
import { initialLocalStorage } from '../../utils/initial';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';

const RecoilEffects = () => {
  useEffect(() => {
    initialLocalStorage();
  }, []);

  const [personTemplatePrestArray, setPersonTemplatePrestArray] = useRecoilState(
    personTemplatePresetArrayState,
  );
  const [selectedTemplateId, setSelectedTemplateId] = useRecoilState(selectedTemplateIdState);

  //   同步localStorage到recoil
  useEffect(() => {
    setSelectedTemplateId(getLocalStorage('selectedTemplateId') || '');
  }, [setSelectedTemplateId]);

  useEffect(() => {
    setPersonTemplatePrestArray(JSON.parse(getLocalStorage('personTemplates') || '') || []);
  }, [setPersonTemplatePrestArray]);

  //  数据变化后 recoil同步到localStorage
  useEffect(() => {
    setLocalStorage('personTemplates', JSON.stringify(personTemplatePrestArray));
  }, [personTemplatePrestArray]);

  useEffect(() => {
    setLocalStorage('selectedTemplateId', selectedTemplateId);
  }, [selectedTemplateId]);

  //   装备类型变化的effect
  const equipmentType = useRecoilValue(equipmentTypeState);

  const setEquipmentPrimaryAttribute = useSetRecoilState(equipmentPrimaryAttributeState);
  const setEquipmentAttribute = useSetRecoilState(equipmentAttributeState);

  useEffect(() => {
    setEquipmentPrimaryAttribute(equipmentTypeOptions[equipmentType].primaryAttritube[0]);

    setEquipmentAttribute({
      attack: '',
      attack_percent: '',
      defense: '',
      defense_percent: '',
      life: '',
      life_percent: '',
      speed: '',
      crit_rate: '',
      crit_injury: '',
      effect_hit: '',
      effect_resistance: '',
    });
  }, [setEquipmentAttribute, equipmentType, setEquipmentPrimaryAttribute]);

  return null;
};

export default RecoilEffects;
