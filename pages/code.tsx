import { Button } from '@mui/material';
import { CopyBlock, dracula } from 'react-code-blocks';
import PageContainer from '../components/pagecontainer';

const code = `const a = 1; 
const b = 2; 
const c = 3;`;

const Code = () => {
  return (
    <PageContainer>
      <CopyBlock
        text={code}
        language="javascript"
        wrapLines
        showLineNumbers
        startingLineNumber={1}
        theme={dracula}
      />
      <Button
        onClick={() => {
          eval(code);
        }}
      >
        运行
      </Button>
    </PageContainer>
  );
};

export default Code;
