import React from 'react'
import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SellIcon from '@mui/icons-material/Sell';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { pink } from '@mui/material/colors';


const FilterBar = ( { filter, handleFilter } ) => {
    return (
        <>
            <IconButton 
                disabled={filter === 'Favorite'}
                onClick={() => handleFilter('Favorite')}
            >
                {filter === 'Favorite' ? <FavoriteIcon sx={{ color: pink[500] }}/> : <FavoriteIcon/>}
                Show Bestsellers
            </IconButton>
            <IconButton 
                disabled={filter === 'Available'}
                onClick={() => handleFilter('Available')}
            >
                {filter === 'Available' ? <SellIcon color='success'/> : <SellIcon/>}
                Show Currently Available Products
            </IconButton> 
            <IconButton 
                disabled={filter === 'None'}
                onClick={() => handleFilter('None')}
            >
                <FilterAltOffIcon/>
                Remove Filter
            </IconButton>
        </>
    )
}

export default FilterBar