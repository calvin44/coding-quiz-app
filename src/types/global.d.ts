type QuizResultRecord = Quiz.QuizResult[]
type HighScoreRecordList = Quiz.HighscoreRecord[]

declare namespace Quiz {
  interface QuestionDataType {
    questionText: string,
    options: string[],
    answer: string
  }

  interface QuizResult extends QuestionDataType {
    answerState: boolean
  }

  interface HighscoreRecord {
    initial: string
    score: number
    result: QuizResultRecord
  }
}