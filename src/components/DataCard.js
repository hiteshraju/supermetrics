import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function DataCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
            <h2 className="font-bold tracking-wider">Manage Orders</h2>
            <div className="mt-5">
                <p className="text-sm"> All Orders related information is available in detail here..</p>
            </div>
        
      </CardContent>
      <CardActions>
        <Button size="small">More Orders</Button>
      </CardActions>
    </Card>
  );
}
