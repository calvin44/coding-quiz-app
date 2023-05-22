import { useCallback, useState } from 'react'

export const useSnackbar = () => {
  const [showSnackbar, setShowSnackbar] = useState(false)

  const openSnackbar = useCallback(() => {
    setShowSnackbar(true)
  }, [])

  const closeSnackbar = useCallback(() => {
    setShowSnackbar(false)
  }, [])

  return {
    showSnackbar,
    openSnackbar,
    closeSnackbar
  }
}