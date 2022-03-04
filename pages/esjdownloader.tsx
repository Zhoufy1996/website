import {
  Button, Card, CardActions, CardContent,
} from '@mui/material';
import PageContainer from '../components/pagecontainer';

const EsjDownloader = () => {
  return (
    <PageContainer>
      <Card variant="outlined" sx={{ width: 400 }}>
        <CardContent>
          esjzeon小说下载扩展

        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              window.open('https://github.com/Zhoufy1996/esjzone-downloader-extension');
            }}
          >
            github地址
          </Button>
        </CardActions>
      </Card>

    </PageContainer>
  );
};

export default EsjDownloader;
