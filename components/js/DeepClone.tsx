import { useEffect } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

import { Title, ContainerBox, FullBox } from '../article';
import deepClone, { deepCloneString } from './utils/deepClone';

const DeepCloneView = () => {
  useEffect(() => {
    window.deepClone = deepClone;
  }, []);
  return (
    <ContainerBox>
      <Title>
        深拷贝
      </Title>
      <FullBox>
        <CopyBlock
          text={deepCloneString}
          language="typescript"
          showLineNumbers
          startingLineNumber={1}
          wrapLines
          theme={dracula}
        />

      </FullBox>
    </ContainerBox>
  );
};

export default DeepCloneView;
