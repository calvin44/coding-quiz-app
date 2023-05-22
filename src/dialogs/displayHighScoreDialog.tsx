import { Fragment } from 'react'
import { useModal } from '../customHook'
import { DialogWrapper } from './dialogWrapper'
import { DialogContentText, ListItem, ListItemText, Typography } from '@mui/material'
import { ExpandableList } from '../components/nestedList'

interface DisplayHighScoreDialogProps extends Omit<ReturnType<typeof useModal>, "showModal"> {
  highScoreList: HighScoreRecordList
}

export const DisplayHighScoreDialog: React.FC<DisplayHighScoreDialogProps> = ({ highScoreList, ...props }) => {
  return (
    <DialogWrapper {...props}>
      {
        highScoreList.length ? (
          highScoreList.map((highScore) => (
            <Fragment key={highScore.initial}>
              <ExpandableList listContent={`${highScore.initial} - ${highScore.score}`}>
                {
                  highScore.result.map((result) => (
                    <ListItem divider sx={{ pl: 4, display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
                      <ListItemText primary={
                        <Typography><b>Question:</b> {result.questionText}</Typography>
                      } />
                      <ListItemText primary={
                        <Typography><b>Correct Answer:</b> {result.answer}</Typography>
                      } />
                      <ListItemText primary={
                        <Typography><b>Your Answer:</b> {result.answerState ? "Correct" : "Incorrect"}</Typography>
                      } />
                    </ListItem>
                  ))
                }
              </ExpandableList>
            </Fragment>
          ))
        ) : (
          <DialogContentText>No Record Yet</DialogContentText>
        )
      }
    </DialogWrapper>
  )
}


