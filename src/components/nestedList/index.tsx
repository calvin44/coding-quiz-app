import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { PropsWithChildren, useState } from 'react'

interface ExpandableListProps extends PropsWithChildren {
  listContent: string
}

export const ExpandableList: React.FC<ExpandableListProps> = ({ listContent, children }) => {
  const [listExpanded, setListExpanded] = useState(false)
  const handleListClick = () => {
    setListExpanded(!listExpanded)
  }
  return (
    <List sx={{ width: 500 }}>
      <ListItemButton onClick={handleListClick}>
        <ListItem>
          <Typography>
            {listContent}
          </Typography>
        </ListItem>
        {listExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listExpanded} timeout="auto" unmountOnExit>
        <List sx={{ pl: 4 }} component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  )
}

