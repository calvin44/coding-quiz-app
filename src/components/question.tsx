import { Alert, AlertProps, Box, Button, Snackbar, Typography, styled } from '@mui/material'
import { questions } from '../data'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { ContentContainer } from './contentContainer'

interface QuestionProps {
  questionIndex: number
  incrementQuestionIndex: () => void
  updateQuizResult: (answerData: Quiz.QuizResult) => void,
  quizResult: Quiz.QuizResult[]
  updateTimer: (count: number) => void
  timeCount: number
}

export const Question: React.FC<QuestionProps> = ({ updateQuizResult, quizResult, questionIndex, incrementQuestionIndex, updateTimer, timeCount }) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const currentQuestion = useMemo(() => questions[questionIndex], [questionIndex])

  const handleCloseSnackbar = useCallback(() => {
    setShowSnackbar(false)
  }, [])

  const handleOpenSnackbar = useCallback(() => {
    setShowSnackbar(false)
    setTimeout(() => {
      setShowSnackbar(true)
    }, 500)
  }, [])

  const setAnswer = useCallback((option: string) => {
    let answerState = false
    if (option === currentQuestion.answer) {
      answerState = true
    } else {
      answerState = false
      updateTimer(timeCount - 10)
    }
    updateQuizResult({
      ...currentQuestion,
      answerState
    })
    incrementQuestionIndex()
    handleOpenSnackbar()
  }, [currentQuestion, handleOpenSnackbar, incrementQuestionIndex, timeCount, updateQuizResult, updateTimer])

  const answerResult = useMemo(() => {
    if (!quizResult.length) return false
    const lastQuestionResult = quizResult[quizResult.length - 1].answerState
    if (!lastQuestionResult) return false
    return lastQuestionResult
  }, [quizResult])

  return (
    <ContentContainer>
      <Typography variant="h5">{currentQuestion.questionText}</Typography>
      <Box display="flex" flexDirection="column" gap={1} marginTop={2}>
        {
          currentQuestion.options.map((option) => (
            <Choice onClick={() => setAnswer(option)} color="primary" variant="contained" key={option}>{option}</Choice>
          ))
        }
      </Box>
      <Snackbar open={showSnackbar} onClose={handleCloseSnackbar} autoHideDuration={1000}>
        <CustomAlert onClose={handleCloseSnackbar} severity={answerResult ? "success" : "error"}>{answerResult ? "Correct" : "Incorrect"}</CustomAlert>
      </Snackbar>
    </ContentContainer>
  )
}

export const CustomAlert = forwardRef<HTMLDivElement, AlertProps>(function CustomAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />
})

const Choice = styled(Button)({
  backgroundColor: "#218380",
  border: "none",
  borderRadius: 5,
  padding: 10,
  cursor: "pointer",
  justifyContent: "flex-start"
})