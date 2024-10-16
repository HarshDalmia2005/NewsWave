import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className='flex justify-center'>
      <Spinner animation="border" variant="light" />
    </div>
  )
}

export default Loader