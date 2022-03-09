import {
  Box, Grid, useTheme,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Title } from '../article';

const BoxModel = () => {
  const theme = useTheme();

  type BoxSizing = 'content-box' | 'border-box';

  const [boxSizing, setBoxSizing] = useState<BoxSizing>('content-box');
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <Box>
      <Title>
        盒模型
      </Title>
      <Grid container spacing={2} sx={{ padding: theme.spacing(1) }}>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>box-sizing</FormLabel>
            <RadioGroup
              value={boxSizing}
              onChange={(e) => {
                setBoxSizing(e.target.value as BoxSizing);
              }}
            >
              <FormControlLabel value="content-box" control={<Radio />} label="content-box" />
              <FormControlLabel value="border-box" control={<Radio />} label="border-box" />
            </RadioGroup>
          </FormControl>
          <Typography>
            width/height: 100
          </Typography>
          <Typography>
            padding: 20
          </Typography>
          <Typography>
            border: 10
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: theme.palette.secondary.light,
              padding: 20,
              border: `10px solid ${theme.palette.secondary.dark}`,
              boxSizing,
            }}
            ref={ref}
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default BoxModel;
