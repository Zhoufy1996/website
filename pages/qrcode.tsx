import {
  Button, Grid, Paper, TextField, useTheme,
} from '@mui/material';
import { useState } from 'react';
import PageContainer from '../components/pagecontainer';

import QRCode from '../components/qrcode';

const QRCodePage = () => {
  const theme = useTheme();
  const [currentValue, setCurrentValue] = useState<string>('');
  const [qrCodeValue, setQrCodeValue] = useState<string>('');

  const [savedText, setSavedText] = useState<string[]>(['zzz', 'xxx', 'aaa']);
  return (
    <PageContainer sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>

        <Grid item xs={6}>
          <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid>
              <TextField
                value={currentValue}
                multiline
                label="文本"
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                }}
                rows={4}
              />
            </Grid>
            <Grid>

              <Button
                onClick={() => {
                  setQrCodeValue(currentValue);
                }}
              >
                生成
              </Button>
              <Button
                onClick={() => {
                  setSavedText((pre) => Array.from(new Set([
                    ...pre,
                    currentValue,
                  ])));
                }}
              >
                暂存
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={6}>
          <QRCode value={qrCodeValue} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: theme.spacing(2) }}>
        {savedText.map((text) => (
          <Grid item sx={{ width: 205 }} key={text}>
            <Paper>
              <QRCode width={200} height={200} value={text} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default QRCodePage;
