import React from 'react'
import Typography from '@mui/material/Typography';

const CardDetails =({ cost, price }) => {
    return (
        <>
            <Typography paragraph>Details:</Typography>
            <Typography variant="body2" color="text.secondary">
                <list>
                    <li>Cost of materials: {cost}</li>
                    <li>Sale price: {price}</li>
                    <li>Profit: {price - cost}</li>
                </list>
            </Typography>
        </>
    )
}

export default CardDetails