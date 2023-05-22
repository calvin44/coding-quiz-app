import { Container, ContainerProps, styled } from '@mui/material'

interface ContentContainerProps extends ContainerProps {
  children: React.ReactNode
}

// set default maxWidth of container to md
export const ContentContainer: React.FC<ContentContainerProps> = ({ children, maxWidth = "md", ...props }) => {
  return (
    <CustomContainer maxWidth={maxWidth} {...props}>{children}</CustomContainer>
  )
}

const CustomContainer = styled(Container)({
  marginTop: 50,
  padding: 30,
  border: "1px solid #218380",
  borderRadius: 20,
  boxShadow: "5px 5px #218380",
  lineHeight: 10,
  display: "flex",
  flexDirection: "column",
  gap: 15
})