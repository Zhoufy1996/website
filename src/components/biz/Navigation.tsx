import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import ConstructionIcon from '@mui/icons-material/Construction';
import BoyIcon from '@mui/icons-material/Boy';

const Navigation = () => {
  const router = useRouter();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return matches ? (
    <ToggleButtonGroup
      onChange={(event, newValue) => {
        router.push(newValue);
      }}
      exclusive
      color="primary"
      value={router.pathname}
      sx={{
        mb: 2,
      }}
    >
      <ToggleButton value="/equipmentenhance">装备强化</ToggleButton>
      <ToggleButton value="/templatesetting">人物模板</ToggleButton>
    </ToggleButtonGroup>
  ) : (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={router.pathname}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
        sx={{
          height: 50,
        }}
      >
        <BottomNavigationAction value="/equipmentenhance" label="装备强化" icon={<ConstructionIcon />} />
        <BottomNavigationAction value="/templatesetting" label="人物模板" icon={<BoyIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
