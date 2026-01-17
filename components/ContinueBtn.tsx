'use client'

import Image from "next/image"

const ContinueBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log('click!')}>
      <a href="#videos">
        Continue Watching
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
          style={{ width: '24px', height: '24px' }}
        />
      </a>
    </button>
  )
}

export default ContinueBtn
