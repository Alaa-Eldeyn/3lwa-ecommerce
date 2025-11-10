export default function Loading() {
  return <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-50">
      <div className="w-16 h-16 border-4 border-primary dark:border-secondary !border-t-transparent rounded-full animate-spin"></div>
    </div>
}