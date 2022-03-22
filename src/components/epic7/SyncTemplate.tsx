import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTemplateIdState } from '../../store/epic7/equipment';
import { personTemplatePresetArrayState } from '../../store/epic7/template';
import { initialLocalStorage } from '../../utils/initial';
import { setLocalStorage } from '../../utils/localStorage';

const SyncTemplate = () => {
  useEffect(() => {
    initialLocalStorage();
  }, []);

  const personTemplatePrestArray = useRecoilValue(personTemplatePresetArrayState);
  const selectedTemplateId = useRecoilValue(selectedTemplateIdState);
  useEffect(() => {
    setLocalStorage('personTemplates', JSON.stringify(personTemplatePrestArray));
  }, [personTemplatePrestArray]);

  useEffect(() => {
    setLocalStorage('selectedTemplateId', selectedTemplateId);
  }, [selectedTemplateId]);

  return null;
};

export default SyncTemplate;
