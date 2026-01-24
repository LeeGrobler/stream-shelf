type Props = Readonly<{
  openText: string
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}>

export default function Modal({
  openText = 'Open Modal',
  title = 'Modal',
  children,
  footer
}: Props) {
  const handleOpen = () => {
    const modal = document.getElementById('modal')
    if (modal instanceof HTMLDialogElement) {
      modal.showModal()
    }
  }

  return (
    <>
      <button className="btn" onClick={handleOpen}>{openText}</button>

      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          {children}
          <div className="modal-action">
            <form method="dialog">
              {footer || <>
                <button className="btn">Close</button>
              </>}
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
