import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import { ContentContainer } from './contentContainer'
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react'
import { useSnackbar } from '../customHook/useSnackbar'

interface ResultProps {
  quizResult: QuizResultRecord
  highScoreList: HighScoreRecordList
  clearQuizState: () => void
  updateHighscoreRecord: (highscoreRecord: Quiz.HighscoreRecord) => void
}

export const Result: React.FC<ResultProps> = ({ updateHighscoreRecord, clearQuizState, quizResult, highScoreList }) => {
  const [userInitial, setUserInitial] = useState("")
  const { showSnackbar: showWarning, openSnackbar, closeSnackbar } = useSnackbar()
  const finalScore = useMemo(() => {
    let calculatedScore = 0
    quizResult.forEach((result) => {
      if (result.answerState === false) {
        calculatedScore = calculatedScore + 2
      }
    })
    return calculatedScore
  }, [quizResult])
  const checkInitial = useCallback((initial: string) => {
    return highScoreList.find((highScores) => highScores.initial === initial)
  }, [highScoreList])
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()
    if (checkInitial(userInitial)) {
      openSnackbar()
      setTimeout(() => {
        closeSnackbar()
      }, 1000)
      return
    }
    updateHighscoreRecord({
      initial: userInitial,
      score: finalScore,
      result: quizResult
    })
    clearQuizState()
    setUserInitial("")
  }, [checkInitial, clearQuizState, closeSnackbar, finalScore, openSnackbar, quizResult, updateHighscoreRecord, userInitial])
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setUserInitial(event.target.value)
  }, [])
  return (
    <ContentContainer>
      <Typography variant="h4">All done!</Typography>
      <Typography>final score is {finalScore}</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center" gap={2}>
        <Typography>Enter initials: </Typography>
        <TextField required onChange={onValueChange} value={userInitial} />
        <Button color="success" type="submit" variant="contained">Submit</Button>
      </Box>
      <Snackbar open={showWarning} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error">Duplicate initials!</Alert>
      </Snackbar>
    </ContentContainer>
  )
}