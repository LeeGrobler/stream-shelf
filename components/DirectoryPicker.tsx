'use client'

const DirectoryPicker = () => {
  const directory = localStorage.getItem('directory')
  if (!directory) return (
    <main>
      <p>Please set a media directory before proceeding.</p>
    </main>
  )

  return (
    <div>DirectoryPicker</div>
  )
}

export default DirectoryPicker