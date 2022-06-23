import React from 'react'
import { useState } from 'react'
import SignUp from './SignUp'
import SignUpS from './SignUpS'

const Form = () => {
  const [formSubmit, setformSubmit] = useState (false)
  const submitForm = () => {
    setformSubmit (true)
  }
  return ( <div>
      {!formSubmit ? ( <SignUp submitForm = {submitForm}/>) : ( <SignUpS/>)}
        </div>
)  
}

export default Form
