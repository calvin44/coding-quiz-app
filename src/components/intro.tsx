import { Box, Button, Typography } from '@mui/material'
import { ContentContainer } from './contentContainer'

interface IntroProps {
  startQuiz: () => void
}

export const Intro: React.FC<IntroProps> = ({ startQuiz: startTimer }) => {
  return (
    <ContentContainer>
      <Typography variant="h4">Coding Quiz Challenge</Typography>
      <Box>
        <Typography>Try to answer to following code-related questions within the time limit</Typography>
        <Typography>Keep in mind that incorrect answer will penalize your score/time by ten seconds!</Typography>
      </Box>
      <Box display="flex">
        <Button onClick={startTimer} variant="contained" size="medium" sx={{ backgroundColor: "#218380" }}>Start Quiz</Button>
      </Box>
    </ContentContainer>
  )
}


