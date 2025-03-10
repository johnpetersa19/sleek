import React, { memo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import './ContextMenu.scss'

interface ContextMenuComponentProps {
  contextMenu: ContextMenu
  setContextMenu: React.Dispatch<React.SetStateAction<ContextMenu | null>>
  setPromptItem: React.Dispatch<React.SetStateAction<PromptItem | null>>
}

const ContextMenuComponent: React.FC<ContextMenuComponentProps> = memo(
  ({ contextMenu, setContextMenu, setPromptItem }) => {
    const onClick = (contextMenuItem: ContextMenuItem): void => {
      if (contextMenuItem.promptItem) {
        setPromptItem(contextMenuItem.promptItem)
      } else if (contextMenuItem.function) {
        contextMenuItem.function()
        setContextMenu(null)
      }
    }

    return (
      <Menu
        id="contextMenu"
        open={Boolean(contextMenu)}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: contextMenu.event.clientY, left: contextMenu.event.clientX }}
      >
        {contextMenu &&
          contextMenu.items.map((contextMenuItem: ContextMenuItem) => (
            <MenuItem
              key={contextMenuItem.id}
              data-testid={`contextMenu-item-${contextMenuItem.id}`}
              onClick={() => onClick(contextMenuItem)}
            >
              {contextMenuItem.label}
            </MenuItem>
          ))}
      </Menu>
    )
  }
)

ContextMenuComponent.displayName = 'ContextMenuComponent'

export default ContextMenuComponent
