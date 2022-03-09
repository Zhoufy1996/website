import { CopyBlock, dracula } from 'react-code-blocks';

import { Title, ContainerBox, FullBox } from '../article';
import { myCallString } from './utils/call';

const CallView = () => {
  return (
    <ContainerBox>
      <Title>
        myCall
      </Title>
      <FullBox>
        <CopyBlock
          text={myCallString}
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

export default CallView;
