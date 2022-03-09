import { CopyBlock, dracula } from 'react-code-blocks';

import { ContainerBox, Title, FullBox } from '../article';
import { myApplyString } from './utils/call';

const ApplyView = () => {
  return (
    <ContainerBox>
      <Title>
        myApply
      </Title>
      <FullBox>
        <CopyBlock
          text={myApplyString}
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

export default ApplyView;
