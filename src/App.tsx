import { Box, Container } from '@mui/material'
import { Header, Intro, Question, Result } from './components'
import { useCallback, useEffect, useState } from 'react'
import { questions } from './data'

export const enum QuizState {
  INTRO = "INTRO",
  QUIZ = "QUIZ",
  RESULT = "RESULT"
}

const App: React.FC = () => {
  const defaultTimeCount: number = 60
  const [timeCount, setTimeCount] = useState(defaultTimeCount)
  const [timerStarted, setTimeStarted] = useState(false)
  const [intervalId, setCurrentIntervalId] = useState<undefined | NodeJS.Timer>()
  const [quizState, setQuizState] = useState<QuizState>(QuizState.INTRO)
  const [quizResult, setQuizResult] = useState<QuizResultRecord>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [highScoreList, setHighScoreList] = useState<HighScoreRecordList>([])

  useEffect(() => {
    if (!timerStarted) return
    const generatedIntervalId = setInterval(() => {
      setCurrentIntervalId(generatedIntervalId)
      setTimeCount(timeCount - 1)
    }, 1000)

    if (timeCount === 0) {
      return clearInterval(generatedIntervalId)
    }

    return () => clearInterval(generatedIntervalId)
  }, [intervalId, timeCount, timerStarted])

  const updateTimer = useCallback((count: number) => {
    clearInterval(intervalId)
    if (count <= 0) {
      setTimeCount(0)
      setTimeStarted(false)
      setCurrentIntervalId(undefined)
      setQuizState(QuizState.RESULT)
      return
    }
    setTimeCount(count)
  }, [intervalId])

  useEffect(() => {
    if (questionIndex < questions.length - 1) return
    setQuizState(QuizState.RESULT)
    updateTimer(0)
  }, [questionIndex, updateTimer])

  useEffect(() => {
    if (timeCount > 0) return
    setTimeCount(0)
    setTimeStarted(false)
    setCurrentIntervalId(undefined)
    setQuizState(QuizState.RESULT)
  }, [timeCount])

  const incrementQuestionIndex = useCallback(() => {
    setQuestionIndex(questionIndex + 1)
  }, [questionIndex])

  const startQuiz = useCallback(() => {
    clearInterval(intervalId)
    setTimeStarted(true)
    setQuizState(QuizState.QUIZ)
  }, [intervalId])

  const updateQuizResult = useCallback((answerData: Quiz.QuizResult) => {
    setQuizResult([...quizResult, answerData])
  }, [quizResult])

  const resetQuizState = useCallback(() => {
    setTimeCount(defaultTimeCount)
    setTimeStarted(false)
    setCurrentIntervalId(undefined)
    setQuizState(QuizState.INTRO)
    setQuizResult([])
    setQuestionIndex(0)
  }, [])

  const updateHighscoreRecord = useCallback((highscoreRecord: Quiz.HighscoreRecord) => {
    setHighScoreList([...highScoreList, highscoreRecord])
  }, [highScoreList])

  const viewHighScore = useCallback(() => {
    console.log(highScoreList)
  }, [highScoreList])

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Header highScoreList={highScoreList} timeCount={timeCount} viewHighScore={viewHighScore} />

      {
        quizState === QuizState.INTRO ? (
          <Intro startQuiz={startQuiz} />
        ) : quizState === QuizState.QUIZ ? (
          <Container maxWidth="md">
            <Question updateQuizResult={updateQuizResult} quizResult={quizResult} questionIndex={questionIndex} incrementQuestionIndex={incrementQuestionIndex} updateTimer={updateTimer} timeCount={timeCount} />
          </Container>
        ) : (
          <Result clearQuizState={resetQuizState} quizResult={quizResult} updateHighscoreRecord={updateHighscoreRecord} highScoreList={highScoreList} />
        )
      }
    </Box>
  );
}

export default App;
