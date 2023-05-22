import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Paper, PaperProps } from '@mui/material'
import { PropsWithChildren } from 'react'
import Draggable from 'react-draggable'
import { useModal } from '../customHook'

interface DialogWrapperProps extends Omit<ReturnType<typeof useModal>, "showModal">, PropsWithChildren, Partial<DialogProps> { }

export const DialogWrapper: React.FC<DialogWrapperProps> = ({ isVisible, hideModal, children }) => {
  return (
    <Dialog
      open={isVisible}
      onClose={hideModal}
      PaperComponent={PaperComponent}
      maxWidth="xl"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        HighScores
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

interface PaperComponentProps extends PaperProps { }

const PaperComponent: React.FC<PaperComponentProps> = ({ ...props }) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
