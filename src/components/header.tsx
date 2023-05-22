import { Box, Button, Container, Typography, styled } from '@mui/material'
import { CreditScoreRounded } from '@mui/icons-material'
import { useModal } from '../customHook'
import { useCallback } from 'react'
import { DisplayHighScoreDialog } from '../dialogs'

interface HeaderProps {
  highScoreList: HighScoreRecordList
  timeCount: number
  viewHighScore: () => void
}

export const Header: React.FC<HeaderProps> = ({ timeCount, viewHighScore, highScoreList }) => {
  const { showModal, ...modal } = useModal()
  const handleViewHighScore = useCallback(() => {
    showModal()
    console.log(highScoreList)
  }, [highScoreList, showModal])
  return (
    <CustomHeader>
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" sx={{ display: "flex", gap: 1, cursor: "pointer", color: "white" }} onClick={handleViewHighScore}>
          <Typography>View Highscores</Typography>
          <CreditScoreRounded />
        </Button>
        <Typography gutterBottom>{timeCount > 0 ? `Time: ${timeCount}` : ""}</Typography>
      </Container>
      <DisplayHighScoreDialog highScoreList={highScoreList} {...modal} />
    </CustomHeader>
  )
}


const CustomHeader = styled(Box)({
  backgroundColor: "#218380",
  width: "100%",
  color: "white",
  padding: 10,
  display: "flex",
  alignItems: "center"
})