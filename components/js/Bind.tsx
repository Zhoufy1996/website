import { CopyBlock, dracula } from 'react-code-blocks';

import { ContainerBox, Title, FullBox } from '../article';
import { myBindString } from './utils/call';

const BindView = () => {
  return (
    <ContainerBox>
      <Title>
        myBind
      </Title>
      <FullBox>
        <CopyBlock
          text={myBindString}
          language="javascript"
          showLineNumbers
          startingLineNumber={1}
          wrapLines
          theme={dracula}
        />

      </FullBox>
    </ContainerBox>
  );
};

export default BindView;
