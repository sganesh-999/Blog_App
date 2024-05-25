// import React from 'react'

// function Logo(width="100%") {
//   return (
//     <div>
//       <img src='' style={{width}} alt="logo plcae holder"/>
//     </div>
//   )
// }

// export default Logo

import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <img
      src='https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png'
      alt='Logo'
      className='hidden md:inline-block w-30 h-20'
      />
    </div>
  )
}

export default Logo