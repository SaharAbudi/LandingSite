import { toast } from 'react-hot-toast'

type SaveCallback = () => Promise<void>

export default function useSaveToast() {
  const saveWithToast = async (callback: SaveCallback) => {
    const savingToast = toast.loading('שומר...')

    try {
      await callback()
      toast.success('✅ נשמר בהצלחה!', { id: savingToast })
    } catch (error) {
      toast.error('❌ שמירה נכשלה', { id: savingToast })
      console.error(error)
    }
  }

  return saveWithToast
}
