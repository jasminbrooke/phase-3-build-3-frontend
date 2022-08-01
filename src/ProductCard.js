import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SellIcon from '@mui/icons-material/Sell';
// ========================================== Edit/Delete
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const API = 'http://localhost:9292'

const ProductCard = ( { product, handleDelete, handleOpen } ) => {
  const {id, productname, description, cost, price, category, img_url} = product
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [available, setAvailable] = useState(true)
  const [favorite, setFavorite] = useState(false)

  const handleCardMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const cardMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem onClick={() => handleOpen(product)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    );
  }
  return (
    <Box gridColumn="span 3">
      {cardMenu()}
      <Card style={{"float": "left"}} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <IconButton 
            onClick={() => setFavorite(!favorite)}
            aria-label="favorite">
              {favorite ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteIcon />}
            </IconButton>
            }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleCardMenu}/>
            </IconButton>
          }
          title={productname}
          subheader={category}
        />
        <CardMedia
          component="img"
          height="194"
          image={img_url}
          alt={productname}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton 
          aria-label="change availability" 
          onClick={() => setAvailable(!available)}>
            {available? <SellIcon color='success' /> : <SellIcon />}
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details:</Typography>
                <Typography variant="body2" color="text.secondary">
                    <list>
                        <li>Cost of materials: {cost}</li>
                        <li>Sale price: {price}</li>
                        <li>Profit: {price - cost}</li>
                    </list>
                </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default ProductCard